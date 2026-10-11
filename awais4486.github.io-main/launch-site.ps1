$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $root

$port = 3000
$siteUrl = "http://localhost:$port"

Write-Host "Starting portfolio site at $siteUrl"

$python = Get-Command python -ErrorAction SilentlyContinue
if ($python) {
    $serverProcess = Start-Process -FilePath $python.Source -ArgumentList @("-m", "http.server", $port) -WorkingDirectory $root -PassThru
    Start-Sleep -Seconds 1
    Start-Process $siteUrl
    Write-Host "Serving from $root"
    Write-Host "Press Ctrl+C in this terminal to stop the server."
    $serverProcess.WaitForExit()
    exit 0
}

$npx = Get-Command npx -ErrorAction SilentlyContinue
if ($npx) {
    $serverProcess = Start-Process -FilePath $npx.Source -ArgumentList @("serve", "-l", $port) -WorkingDirectory $root -PassThru
    Start-Sleep -Seconds 2
    Start-Process $siteUrl
    Write-Host "Serving from $root"
    Write-Host "Press Ctrl+C in this terminal to stop the server."
    $serverProcess.WaitForExit()
    exit 0
}

throw "Neither Python nor Node.js is available on this machine. Install Python or Node and run this script again."
