Write-Host "Corrigindo encoding..." -ForegroundColor Cyan

# Garantir que estamos no diretorio correto
Set-Location "C:\pethere-landing-page"

$file = "C:\pethere-landing-page\app\page.tsx"

# Verificar se arquivo existe
if (-not (Test-Path $file)) {
    Write-Host "ERRO: Arquivo nao encontrado em $file" -ForegroundColor Red
    exit
}

Write-Host "Arquivo encontrado!" -ForegroundColor Green

$bytes = [System.IO.File]::ReadAllBytes($file)
$content = [System.Text.Encoding]::UTF8.GetString($bytes)

Write-Host "Aplicando correcoes..." -ForegroundColor Yellow

# Substituir sequencias corrompidas
$content = $content -replace 'FRT Automacao [^\-]+ 25 Anos', 'FRT Automacao - 25 Anos'
$content = $content -replace 'MANT[^ ]+ ESTRUTURA', 'MANTENHAM ESTRUTURA'
$content = $content -replace 'MANT[^ ]+ L[^ ]+GICA', 'MANTENHAM LOGICA'
$content = $content -replace 'MANT[^ ]+ COMPONENTE', 'MANTENHAM COMPONENTE'
$content = $content -replace 'GPS GR[^ ]+TIS', 'GPS GRATIS'
$content = $content -replace 'MEU GPS GR[^ ]+TIS', 'MEU GPS GRATIS'
$content = $content -replace 'VOC[^ ]+ ECONOMIZA', 'VOCE ECONOMIZA'
$content = $content -replace 'Voc[^ ]+ Economiza', 'Voce Economiza'
$content = $content -replace 'pre[^ ]+os', 'precos'
$content = $content -replace 'promo[^ ]+o([^n]|$)', 'promocao$1'
$content = $content -replace 'PROMO[^ ]+O', 'PROMOCAO'
$content = $content -replace 'at[^ ]+ 7 dias', 'ate 7 dias'
$content = $content -replace 'S[^ ]+o Paulo', 'Sao Paulo'
$content = $content -replace 'R\$ 478,80 [^ ]+ vista', 'R$ 478,80 a vista'
$content = $content -replace 'by FRT Automa[^ ]+o', 'by FRT Automacao'
$content = $content -replace 'anos FRT Automa[^ ]+o', 'anos FRT Automacao'

$Utf8NoBomEncoding = New-Object System.Text.UTF8Encoding $False
[System.IO.File]::WriteAllLines($file, $content, $Utf8NoBomEncoding)

Write-Host ""
Write-Host "Corrigido! Pressione Ctrl+Shift+R no navegador" -ForegroundColor Green
Write-Host ""