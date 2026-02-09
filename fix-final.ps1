Write-Host "================================" -ForegroundColor Cyan
Write-Host "  CORRECAO FINAL DE ENCODING" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan

$file = "app\page.tsx"
$content = [System.IO.File]::ReadAllText($file, [System.Text.Encoding]::UTF8)

Write-Host "Aplicando correcoes..." -ForegroundColor Yellow

# Corrigir linhas específicas que vi no arquivo
$content = $content -replace 'FRT Automacao ÃƒÆ.*?25 Anos', 'FRT Automação - 25 Anos'
$content = $content -replace 'MANTÃƒÆ.*?M ESTRUTURA', 'MANTENHAM ESTRUTURA'
$content = $content -replace 'MANTÃƒÆ.*?M LÃƒÆ.*?GICA', 'MANTENHAM LÓGICA'
$content = $content -replace 'MANTÃƒÆ.*?M COMPONENTE', 'MANTENHAM COMPONENTE'
$content = $content -replace 'voce ama', 'você ama'
$content = $content -replace 'Frete Gratis', 'Frete Grátis'
$content = $content -replace 'GPS GRÃƒÆ.*?TIS', 'GPS GRÁTIS'
$content = $content -replace 'MEU GPS GRÃƒÆ.*?TIS', 'MEU GPS GRÁTIS'
$content = $content -replace 'VOCÃƒÆ.*? ECONOMIZA', 'VOCÊ ECONOMIZA'
$content = $content -replace 'VocÃƒÆ.*? Economiza', 'Você Economiza'
$content = $content -replace 'preÃƒÆ.*?os', 'preços'
$content = $content -replace 'promoÃƒÆ.*?o', 'promoção'
$content = $content -replace 'PROMOÃƒÆ.*?O', 'PROMOÇÃO'
$content = $content -replace 'atÃƒÆ.*? 7 dias', 'até 7 dias'
$content = $content -replace 'SÃƒÆ.*?o Paulo', 'São Paulo'
$content = $content -replace 'ÃƒÆ.*?rea', 'área'
$content = $content -replace 'R\$ 478,80 ÃƒÆ.*? vista', 'R$ 478,80 à vista'
$content = $content -replace 'by FRT AutomaÃƒÆ.*?o', 'by FRT Automação'
$content = $content -replace 'anos FRT AutomaÃƒÆ.*?o', 'anos FRT Automação'
$content = $content -replace 'ÃƒÆ.*?2026', '© 2026'
$content = $content -replace 'Receba em Casa.*?Kit completo em atÃƒÆ[^'']*', 'Receba em Casa'', description: ''Kit completo em até 7 dias'

Write-Host "Salvando arquivo..." -ForegroundColor Yellow

$Utf8NoBomEncoding = New-Object System.Text.UTF8Encoding $False
[System.IO.File]::WriteAllLines("$PWD\$file", $content, $Utf8NoBomEncoding)

Write-Host ""
Write-Host "================================" -ForegroundColor Green
Write-Host "     CORRIGIDO COM SUCESSO!" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Green
Write-Host ""
Write-Host "Recarregue a pagina: Ctrl + Shift + R" -ForegroundColor Cyan
Write-Host ""