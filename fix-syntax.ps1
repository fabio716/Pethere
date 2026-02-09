Write-Host "Corrigindo erro de sintaxe..." -ForegroundColor Cyan

# Ler o arquivo
$content = Get-Content "app\page.tsx" -Raw

# Corrigir a linha duplicada
$content = $content -replace 'window\.open window\.open', 'window.open'

# Salvar com encoding correto
$Utf8NoBomEncoding = New-Object System.Text.UTF8Encoding $False
[System.IO.File]::WriteAllLines("$PWD\app\page.tsx", $content, $Utf8NoBomEncoding)

Write-Host "Corrigido!" -ForegroundColor Green
Write-Host "Iniciando servidor..." -ForegroundColor Cyan

# Limpar cache
Remove-Item ".next" -Recurse -Force -ErrorAction SilentlyContinue

# Iniciar servidor
npm run dev