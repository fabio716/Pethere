Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  TESTE DE CONEXAO ADMIN <-> SITE" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Aguardando servidor iniciar..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

Write-Host "Testando API..." -ForegroundColor Cyan
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000/api/site-config" -UseBasicParsing
    $data = $response.Content | ConvertFrom-Json
    
    Write-Host "[OK] API respondeu com sucesso!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Dados carregados:" -ForegroundColor Cyan
    Write-Host "  - Company: $($data.companyName)" -ForegroundColor White
    Write-Host "  - Hero Title: $($data.heroTitle)" -ForegroundColor White
    Write-Host "  - Hero Highlight: $($data.heroHighlight)" -ForegroundColor White
    Write-Host ""
    
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "       TUDO FUNCIONANDO!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "PROXIMOS PASSOS:" -ForegroundColor Cyan
    Write-Host "1. Acesse: http://localhost:3000/admin/cms" -ForegroundColor White
    Write-Host "2. Mude um texto qualquer" -ForegroundColor White
    Write-Host "3. Clique em 'Publicar Alteracoes'" -ForegroundColor White
    Write-Host "4. Abra: http://localhost:3000" -ForegroundColor White
    Write-Host "5. Pressione CTRL+SHIFT+R (hard refresh)" -ForegroundColor White
    Write-Host "6. Veja a mudanca aparecer!" -ForegroundColor White
    Write-Host ""
} catch {
    Write-Host "[ERRO] API nao respondeu!" -ForegroundColor Red
    Write-Host "Certifique-se que o servidor esta rodando (npm run dev)" -ForegroundColor Yellow
}