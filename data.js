// Edit this file to change what shows up on the site. No other file needs to change.
window.SITE = {
  name: "Awais Ahmed",
  role: "SOC Analyst | Cyber Enthusiast",
  headline: "I build software and defend the networks it runs on.",
  intro: "Computer scientist specializing in secure mobile engineering, automated data pipelines, and threat defense.",
  status: "Open to SOC and security roles",
  links: {
    email: "waisigondal4486@gmail.com",
    phone: "+923390104486",
    linkedin: "https://www.linkedin.com/in/awais-ahmed-32b038284",
    github: "https://github.com/awais4486",
    resume: "assets/Awais_Ahmed_CV.pdf"
  },

  // Contact form. Get a free access key at https://web3forms.com (enter your email, they send you the key).
  // Leave empty and the form will open the visitor's email app instead.
  form: { accessKey: "" },

  about: {
    text: "I specialize in software development, mobile applications and cybersecurity operations. I have built cross-platform mobile apps at GOL TEC, full-stack projects, and active network defense tools such as a real-time packet monitor with automated intrusion prevention. I am comfortable running complex virtualized lab environments and carrying out digital forensics investigations.",
    location: "Rawalpindi, Pakistan",
    photo: "Profile_Picture.jpeg" // looked up in assets/ first, then the main folder
  },
  education: [
    { school: "KICSIT, Institute of Space Technology, Islamabad", degree: "BS Computer Science (CGPA 3.65/4.00)", years: "2022 – 2026" }
  ],
  experience: [
    { title: "Mobile App Developer (React Native), GOL Technologies", period: "Feb 2026 – Present · Islamabad", points: [
      "Build mobile apps for both iOS and Android from a single React Native codebase, using JavaScript and TypeScript.",
      "Turn designs into responsive screens and reusable components, styled with CSS-like rules and HTML-based layout knowledge from the web.",
      "Connect apps to backend APIs, manage app state and data flow, and keep the code typed, clean and easy to maintain.",
      "Test on both platforms and fix platform-specific issues so the apps feel consistent for every user."
    ]}
  ],
  skills: {
    "Languages": ["JavaScript", "TypeScript", "Python", "Java (Android)", "HTML", "CSS", "C++"],
    "Frameworks": ["React", "React Native (iOS & Android)", "Tailwind CSS", "Node.js", "Express.js", "Flask"],
    "Security & networking": ["Packet Analysis", "IPS", "Log Automation", "pfSense", "Security Onion", "Penetration Testing", "Network Isolation"],
    "Digital forensics": ["Magnet AXIOM Process", "Magnet AXIOM Examine", "Artifact Analysis"],
    "Systems": ["Kali Linux", "Ubuntu Server", "Windows Server", "Metasploitable", "VMware", "VirtualBox"],
    "Data science": ["Pandas", "NumPy", "Matplotlib", "Scikit-learn"],
    "Tools": ["Git", "GitHub"]
  },
  certifications: [
    { name: "Google Cybersecurity Specialization", issuer: "Google" },
    { name: "Microsoft Cybersecurity Analyst", issuer: "Microsoft" },
    { name: "Ethical Hacking", issuer: "GLA" },
    { name: "Software Testing Tutorial", issuer: "GLA" },
    { name: "Kali Linux", issuer: "Board Infinity" },
    { name: "Cybersecurity for Businesses", issuer: "EC-Council" },
    { name: "Introduction to Networking", issuer: "NVIDIA" }
  ],

  // Projects are shown under these headings, in this order. Each project picks one with `group`.
  projectGroups: [
    { id: "apps",     eyebrow: "Apps I build",      title: "Mobile & Web" },
    { id: "security", eyebrow: "Systems I defend",  title: "Security & Forensics" }
  ],

  // SCREENSHOTS
  // The most reliable way (works on Vercel, Netlify, GitHub Pages) is to list the files in `images`.
  //   images: ["assets/screenshots/idps/1.png", "assets/screenshots/idps/2.png"]
  // If `images` is empty, the site tries to read `folder` (this only works when run locally),
  // and finally falls back to the single `image` path.
  projects: [
    {
      group: "apps",
      title: "React Native Store App",
      summary: "A mobile store app that loads its products from a Strapi backend and presents them in a clean, fast shopping experience on iOS and Android.",
      points: [
        "Products managed in Strapi and fetched through REST API calls, with loading and error states",
        "Camera module integration for capturing photos on the device",
        "Async Storage keeps data on the phone, such as the cart, so it survives closing the app",
        "Product search and category filtering to find items quickly",
        "Pull-to-refresh so the catalog stays in sync with the backend"
      ],
      tags: ["React Native", "Strapi", "REST API", "Camera", "Async Storage", "JavaScript"],
      folder: "ReactNative",
      images: [
        "WhatsApp Image 2026-10-01 at 10.19.01 AM (1).jpeg",
        "WhatsApp Image 2026-10-01 at 10.19.01 AM.jpeg",
        "WhatsApp Image 2026-10-01 at 10.19.02 AM (1).jpeg",
        "WhatsApp Image 2026-10-01 at 10.19.02 AM (2).jpeg",
        "WhatsApp Image 2026-10-01 at 10.19.02 AM (3).jpeg",
        "WhatsApp Image 2026-10-01 at 10.19.02 AM (4).jpeg",
        "WhatsApp Image 2026-10-01 at 10.19.02 AM (5).jpeg",
        "WhatsApp Image 2026-10-01 at 10.19.02 AM (6).jpeg",
        "WhatsApp Image 2026-10-01 at 10.19.02 AM.jpeg"
      ],
      image: "assets/screenshots/store.png",
      github: "",
      live: ""
    },
    {
      group: "security",
      title: "Real-Time Network Monitoring & Security System (IDPS)",
      summary: "A monitoring system that captures live network packets, parses protocols and writes structured security logs, with a web dashboard on top.",
      points: [
        "Web dashboard for real-time traffic visualization and log management",
        "Active IPS that blocks malicious source IPs based on packet analysis",
        "Data flow bridges low-level packet capture with dashboard actions for fast incident response"
      ],
      tags: ["Python", "Scapy", "Linux", "iptables", "Packet Analysis", "Log Automation"],
      folder: "IDPS",
      images: [
        "WhatsApp Image 2026-09-29 at 12.45.11 PM.jpeg",
        "WhatsApp Image 2026-09-29 at 12.45.12 PM (1).jpeg",
        "WhatsApp Image 2026-09-29 at 12.45.12 PM.jpeg",
        "WhatsApp Image 2026-09-29 at 12.45.13 PM.jpeg",
        "WhatsApp Image 2026-09-29 at 12.45.14 PM (1).jpeg",
        "WhatsApp Image 2026-09-29 at 12.45.14 PM.jpeg",
        "WhatsApp Image 2026-09-29 at 12.45.15 PM (1).jpeg",
        "WhatsApp Image 2026-09-29 at 12.45.15 PM.jpeg",
        "WhatsApp Image 2026-09-29 at 12.45.16 PM.jpeg",
        "WhatsApp Image 2026-09-29 at 12.45.17 PM.jpeg"
      ],
      image: "assets/screenshots/idps.png",
      github: "",
      live: ""
    },
    {
      group: "security",
      title: "Enterprise Cybersecurity & Network Security Labs",
      summary: "Hands-on virtualized lab networks for practicing attack and defense.",
      points: [
        "pfSense firewall routing, NAT and traffic isolation",
        "Penetration tests and vulnerability assessments against Metasploitable and Windows 10/Server from Kali Linux",
        "Security Onion for network security monitoring, log analysis and intrusion alerts",
        "Local Ubuntu and Windows Server environments"
      ],
      tags: ["Kali Linux", "Security Onion", "pfSense", "Ubuntu", "Metasploitable", "Windows Server"],
      images: [
        "Monitoring/Screenshot 2026-10-09 213737.png",
        "Monitoring/Screenshot 2026-10-09 214306.png",
        "Monitoring/Screenshot 2026-10-09 214335.png"
      ],
      image: "assets/screenshots/labs.png",
      github: "",
      live: ""
    },
    {
      group: "security",
      title: "Digital Forensics & Incident Response Investigations",
      summary: "Practical case studies using enterprise forensics software to acquire, parse and analyze digital evidence.",
      points: [
        "Artifact analysis across Windows and mobile systems: system artifacts, user activity logs and deleted data",
        "Forensic reports with timeline analysis and evidence findings"
      ],
      tags: ["Magnet AXIOM Process", "Magnet AXIOM Examine"],
      github: "",
      live: ""
    }
  ]
};
