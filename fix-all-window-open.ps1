Write-Host "Corrigindo todos os erros de window.open..." -ForegroundColor Cyan

$file = "app\page.tsx"
$content = Get-Content $file -Raw

Write-Host "Backup atual..." -ForegroundColor Yellow
Copy-Item $file "$file.temp" -Force

# Correção 1: window.open duplicado (linha 34)
$content = $content -replace 'window\.open window\.open', 'window.open'

# Correção 2: href=window.open (linha 337)
$content = $content -replace 'href=window\.open\([^)]+\)target=', 'href="SUA-URL-AQUI" target='

# Correção 3: Remover window.open extra dentro de tags <a>
$content = $content -replace '<a[^>]*>[\s\n]*window\.open\([^)]+\)[\s\n]*</a>', ''

# Salvar
$Utf8NoBomEncoding = New-Object System.Text.UTF8Encoding $False
[System.IO.File]::WriteAllLines("$PWD\$file", $content, $Utf8NoBomEncoding)

Write-Host "Corrigido! O servidor vai recarregar." -ForegroundColor Green