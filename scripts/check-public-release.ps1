param(
  [string]$Root = (Join-Path $PSScriptRoot '..')
)

$ErrorActionPreference = 'Stop'
$patterns = @(
  'sk-[A-Za-z0-9_-]{20,}',
  '(?i)(api[_-]?key|access[_-]?token|secret)\s*[:=]\s*["'']?[A-Za-z0-9_\-]{16,}',
  '(?i)[A-Z]:\\Users\\',
  '(?i)C:\\Users\\',
  '(?i)\\AppData\\Local\\Temp\\'
)

$files = Get-ChildItem -LiteralPath ([System.IO.Path]::GetFullPath($Root)) -Recurse -File |
  Where-Object { $_.FullName -notmatch '\\node_modules\\|\\.git\\' }
$hits = @()
foreach ($file in $files) {
  $text = Get-Content -Raw -LiteralPath $file.FullName -ErrorAction SilentlyContinue
  foreach ($pattern in $patterns) {
    if ($text -match $pattern) {
      $hits += [pscustomobject]@{ File=$file.FullName; Pattern=$pattern }
    }
  }
}

if ($hits.Count -gt 0) {
  $hits | Format-Table -AutoSize
  throw "Potential private data found. Review before publishing."
}

Write-Output "Public-release scan passed: no common keys or local-path leaks found."
