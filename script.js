const S = window.SITE;
const $ = (id) => document.getElementById(id);
const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
const esc = (s) => String(s).replace(/[&<>"]/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;" }[c]));

document.title = `${S.name} – ${S.role}`;
$("brand").textContent = S.name;
$("status").textContent = S.status;
const h = $("headline");
h.setAttribute("aria-label", S.headline);
h.innerHTML = S.headline.split(" ").map((w, i) => `<span class="w" aria-hidden="true"><span style="--i:${i}">${esc(w)}</span></span>`).join(" ");
$("intro").textContent = S.intro;
$("btn-resume").href = S.links.resume;
$("btn-resume-download").href = S.links.resumeDownload;
$("about-text").textContent = S.about.text;
$("about-loc").textContent = S.about.location;
$("foot").textContent = `© ${new Date().getFullYear()} ${S.name}`;

const photo = $("photo");
// Looks for Profile_Picture in assets/ or the main folder, trying common file types.
(function findPhoto() {
  const base = S.about.photo;
  const hasExt = /\.(jpe?g|png|webp|gif|avif)$/i.test(base);
  const exts = hasExt ? [""] : [".jpg", ".jpeg", ".png", ".webp", ".JPG", ".JPEG", ".PNG", ".jfif", ".avif"];
  const names = [base, base.toLowerCase()];
  const folders = ["assets/", "", "assets/images/"];
  const tries = [];
  folders.forEach(f => names.forEach(n => exts.forEach(x => tries.push(f + n + x))));
  const next = (i) => {
    if (i >= tries.length) { photo.textContent = "Add your photo"; return; }
    const im = new Image();
    im.onload = () => { photo.textContent = ""; photo.style.backgroundImage = `url("${tries[i]}")`; };
    im.onerror = () => next(i + 1);
    im.src = tries[i];
  };
  next(0);
})();

$("education").append(...S.education.map(e => el("li", "", `${esc(e.degree)}<small>${esc(e.school)}, ${esc(e.years)}</small>`)));

$("experience").append(...S.experience.map(x => {
  const d = el("div", "exp", `<strong>${esc(x.title)}</strong><small>${esc(x.period)}</small>`);
  d.append(el("ul", "", x.points.map(p => `<li>${esc(p)}</li>`).join("")));
  return d;
}));

$("skills").append(...Object.entries(S.skills).map(([group, items]) =>
  el("div", "skill-row", `<strong>${esc(group)}</strong><div class="chips">${items.map(i => `<span class="chip">${esc(i)}</span>`).join("")}</div>`)));

$("certs").append(...S.certifications.map(c => el("li", "", `${esc(c.name)}<small>${esc(c.issuer)}</small>`)));

$("project-list").append(...S.projects.map((p, projectIndex) => {
  const hasGallery = p.folder || p.image || (p.images && p.images.length);
  const isLastProject = projectIndex === S.projects.length - 1;
  const art = el("article", `project${isLastProject ? " project-text-only" : ""}`);
  const links = [
    p.github && `<a href="${esc(p.github)}" target="_blank" rel="noopener">GitHub</a>`,
    p.document && `<a href="${esc(p.document)}" target="_blank" rel="noopener">Project document</a>`,
    p.live && `<a href="${esc(p.live)}" target="_blank" rel="noopener">${esc(p.liveLabel || "Live demo")}</a>`
  ].filter(Boolean).join("");
  const meta = [p.role, p.status, p.year].filter(Boolean).map(esc).join(" · ");
  const details = `${p.description ? `<p class="project-description">${esc(p.description)}</p>` : ""}${meta ? `<p class="project-meta">${meta}</p>` : ""}`;
  art.append(
    el("div", "", `<h3>${esc(p.title)}</h3><p>${esc(p.summary)}</p>${details}<ul>${p.points.map(x => `<li>${esc(x)}</li>`).join("")}</ul><div class="chips">${p.tags.map(t => `<span class="chip">${esc(t)}</span>`).join("")}</div><div class="links">${links}</div>`));
  if (hasGallery) {
    const shot = el("div", "shot");
    buildGallery(shot, p);
    art.append(shot);
  }
  return art;
}));

$("c-phone").href = `tel:${S.links.phone}`;
$("c-email").href = `mailto:${S.links.email}`;
$("c-linkedin").href = S.links.linkedin;
$("c-github").href = S.links.github;

// ---------- screenshots / gallery ----------
const IMG_RE = /\.(png|jpe?g|webp|gif|avif|jfif)$/i;
const natural = (a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });

// Reads the file list of a folder (works with python -m http.server and live-server).
async function listFolder(folder) {
  const bases = [folder, "assets/" + folder, "assets/screenshots/" + folder];
  for (const b of bases) {
    try {
      const url = new URL(b.replace(/\/?$/, "/"), location.href);
      const res = await fetch(url);
      if (!res.ok) continue;
      const html = await res.text();
      const doc = new DOMParser().parseFromString(html, "text/html");
      const files = [...doc.querySelectorAll("a[href]")]
        .map(a => a.getAttribute("href"))
        .filter(h => IMG_RE.test(decodeURIComponent(h.split("?")[0])))
        .map(h => new URL(h, url).pathname.replace(/^\//, ""))
        .map(h => decodeURI(h));
      if (files.length) return files.sort(natural);
    } catch (e) { /* try next location */ }
  }
  return [];
}

async function buildGallery(shot, p) {
  const discovered = p.folder ? await listFolder(p.folder) : [];
  const configured = p.images && p.images.length
    ? p.images.map(f => (p.folder && !f.includes("/") ? `${p.folder}/${f}` : f))
    : [];
  let imgs = [...new Set([...configured, ...discovered])];
  if (!imgs.length && p.image) imgs = [p.image];
  if (!imgs.length) {
    shot.remove();
    return;
  }

  // keep only images that really load
  const ok = [];
  await Promise.all(imgs.map((src, i) => new Promise(r => { const t = new Image(); t.onload = () => { ok[i] = src; r(); }; t.onerror = r; t.src = src; })));
  const list = ok.filter(Boolean);
  if (!list.length) { shot.textContent = "Add a screenshot"; return; }

  let i = 0;
  const img = new Image(); img.alt = `${p.title} screenshot`; img.className = "g-img";
  const show = (n) => { i = (n + list.length) % list.length; img.src = list[i]; count.textContent = `${i + 1} / ${list.length}`; };
  const count = el("span", "g-count");
  shot.replaceChildren(img);
  shot.classList.add("gallery", `gallery-${p.orientation || "landscape"}`);
  img.addEventListener("click", () => openLightbox(list, i));
  if (list.length > 1) {
    const prev = el("button", "g-btn prev", "‹"), next = el("button", "g-btn next", "›");
    prev.setAttribute("aria-label", "Previous screenshot"); next.setAttribute("aria-label", "Next screenshot");
    prev.onclick = (e) => { e.stopPropagation(); show(i - 1); };
    next.onclick = (e) => { e.stopPropagation(); show(i + 1); };
    shot.append(prev, next, count);
  }
  show(0);
}

function openLightbox(list, start) {
  let i = start;
  const box = el("div", "lightbox");
  const im = new Image();
  const close = () => { box.remove(); removeEventListener("keydown", key); };
  const go = (n) => { i = (n + list.length) % list.length; im.src = list[i]; };
  const key = (e) => { if (e.key === "Escape") close(); if (e.key === "ArrowRight") go(i + 1); if (e.key === "ArrowLeft") go(i - 1); };
  box.append(im);
  if (list.length > 1) {
    const p = el("button", "g-btn prev", "‹"), n = el("button", "g-btn next", "›");
    p.onclick = (e) => { e.stopPropagation(); go(i - 1); }; n.onclick = (e) => { e.stopPropagation(); go(i + 1); };
    box.append(p, n);
  }
  box.addEventListener("click", close);
  addEventListener("keydown", key);
  go(i);
  document.body.append(box);
}

// ---------- motion ----------
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const fine = matchMedia("(pointer: fine)").matches;

// skills marquee (list repeated so the loop is seamless)
const allSkills = Object.values(S.skills).flat();
const row = allSkills.map(t => `<span>${esc(t)}</span>`).join("");
$("marquee").innerHTML = row + row;

if (!reduce) {
  // scroll reveal
  const targets = document.querySelectorAll("#about .about-grid, #about .skills-h, #skills, #certs, #projects h2, .project, #about h2, .contact > *");
  const io = new IntersectionObserver((entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .15 });
  targets.forEach(t => { t.classList.add("reveal"); io.observe(t); });

  // 3D tilt on screenshots
  document.querySelectorAll(".project .shot").forEach(shot => {
    shot.classList.add("tilt");
    shot.addEventListener("pointermove", (e) => {
      const r = shot.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      shot.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale(1.02)`;
    });
    shot.addEventListener("pointerleave", () => { shot.style.transform = ""; });
  });

  // magnetic buttons
  if (fine) document.querySelectorAll(".btn").forEach(b => {
    b.addEventListener("pointermove", (e) => {
      const r = b.getBoundingClientRect();
      b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .25}px, ${(e.clientY - r.top - r.height / 2) * .35}px)`;
    });
    b.addEventListener("pointerleave", () => { b.style.transform = ""; });
  });

  // cursor glow
  if (fine) {
    const g = $("glow");
    addEventListener("pointermove", (e) => { g.classList.add("on"); g.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`; });
    document.addEventListener("pointerleave", () => g.classList.remove("on"));
  }
}

// scroll progress + active nav link
const bar = $("progress");
const links = [...document.querySelectorAll(".nav nav a")];
const secs = links.map(a => document.querySelector(a.getAttribute("href")));
function onScroll() {
  const max = document.documentElement.scrollHeight - innerHeight;
  bar.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
  const atBottom = scrollY + innerHeight >= document.documentElement.scrollHeight - 1;
  let cur = atBottom ? secs.length - 1 : 0;
  if (!atBottom) secs.forEach((s, i) => { if (s && s.getBoundingClientRect().top < innerHeight * .4) cur = i; });
  links.forEach((a, i) => {
    const active = i === cur;
    a.classList.toggle("active", active);
    if (active) a.setAttribute("aria-current", "location");
    else a.removeAttribute("aria-current");
  });
}
addEventListener("scroll", onScroll, { passive: true });
onScroll();
