Write-Host "Corrigindo encoding..." -ForegroundColor Cyan

$file = "app\page.tsx"
$content = Get-Content $file -Raw

# Substituir padroes corrompidos por versao limpa
$content = $content -replace 'Gr[^a-zA-Z]{10,30}tis', 'Gratis'
$content = $content -replace 'Automa[^a-zA-Z]{10,50}o', 'Automacao'
$content = $content -replace 'voc[^a-zA-Z]{10,30}', 'voce '
$content = $content -replace 'Voc[^a-zA-Z]{10,30}', 'Voce '
$content = $content -replace 'VOC[^a-zA-Z]{10,30}', 'VOCE '
$content = $content -replace 'pre[^a-zA-Z]{10,30}os', 'precos'
$content = $content -replace 'promo[^a-zA-Z]{10,50}o', 'promocao'
$content = $content -replace 'PROMO[^a-zA-Z]{10,50}O', 'PROMOCAO'
$content = $content -replace 'S[^a-zA-Z]{10,30}o Paulo', 'Sao Paulo'
$content = $content -replace 'at[^a-zA-Z]{10,30} ', 'ate '

$Utf8NoBomEncoding = New-Object System.Text.UTF8Encoding $False
[System.IO.File]::WriteAllLines("$PWD\$file", $content, $Utf8NoBomEncoding)

Write-Host "Corrigido! Recarregue a pagina (Ctrl+Shift+R)" -ForegroundColor Green