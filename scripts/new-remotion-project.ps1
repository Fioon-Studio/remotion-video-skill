param(
  [Parameter(Mandatory=$true)] [string]$Target,
  [string]$ProjectName = 'remotion-video'
)

$ErrorActionPreference = 'Stop'
$template = Join-Path $PSScriptRoot '..\templates\remotion-app'
$targetPath = [System.IO.Path]::GetFullPath($Target)

if (Test-Path $targetPath) {
  $existing = Get-ChildItem -Force $targetPath
  if ($existing.Count -gt 0) {
    throw "Target must be empty or not exist: $targetPath"
  }
}

New-Item -ItemType Directory -Force -Path $targetPath | Out-Null
Copy-Item -Path (Join-Path $template '*') -Destination $targetPath -Recurse -Force

$packageJson = Join-Path $targetPath 'package.json'
$json = Get-Content -Raw $packageJson | ConvertFrom-Json
$json.name = $ProjectName.ToLower() -replace '[^a-z0-9-]', '-'
$json | ConvertTo-Json -Depth 20 | Set-Content -Encoding UTF8 $packageJson

Write-Output "Created Remotion starter at $targetPath"
Write-Output "Next: npm install; npm run dev"
