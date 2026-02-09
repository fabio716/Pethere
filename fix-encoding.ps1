Write-Host "Corrigindo encoding UTF-8..." -ForegroundColor Cyan

# Ler arquivo
$content = Get-Content "app\page.tsx" -Raw -Encoding UTF8

# Corrigir caracteres corrompidos comuns
$fixes = @{
    'GrÃƒÂ¡tis' = 'Grátis'
    'Ã©' = 'é'
    'Ã¡' = 'á'
    'Ã£' = 'ã'
    'Ã§' = 'ç'
    'Ãª' = 'ê'
    'Ã³' = 'ó'
    'Ã­' = 'í'
    'Ãº' = 'ú'
    'Ã"' = 'Ó'
    'Ã‰' = 'É'
    'Ã' = 'Á'
}

foreach ($key in $fixes.Keys) {
    $content = $content -replace [regex]::Escape($key), $fixes[$key]
}

# Salvar com UTF-8 correto
$Utf8NoBomEncoding = New-Object System.Text.UTF8Encoding $False
[System.IO.File]::WriteAllLines("$PWD\app\page.tsx", $content, $Utf8NoBomEncoding)

Write-Host "Encoding corrigido!" -ForegroundColor Green
Write-Host "Recarregue a página (Ctrl+Shift+R)" -ForegroundColor Cyan