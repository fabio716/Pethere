Write-Host "Corrigindo TODOS os erros de sintaxe..." -ForegroundColor Cyan

# Ler o arquivo
$content = Get-Content "app\page.tsx" -Raw

# Correção 1: window.open duplicado
$content = $content -replace 'window\.open window\.open', 'window.open'

# Correção 2: href errado na linha 337
$content = $content -replace 'href=window\.open\(''SUA-URL-AQUI'', ''_blank''\)target=', 'href="SUA-URL-AQUI" target='

# Correção 3: remover window.open duplicado na linha 338
$content = $content -replace '\s+window\.open\(''SUA-URL-AQUI'', ''_blank''\)\s+</a>', '</a>'

# Salvar com encoding correto
$Utf8NoBomEncoding = New-Object System.Text.UTF8Encoding $False
[System.IO.File]::WriteAllLines("$PWD\app\page.tsx", $content, $Utf8NoBomEncoding)

Write-Host "Todas as correções aplicadas!" -ForegroundColor Green

# Limpar cache
Remove-Item ".next" -Recurse -Force -ErrorAction SilentlyContinue

Write-Host "Execute: npm run dev" -ForegroundColor Cyan