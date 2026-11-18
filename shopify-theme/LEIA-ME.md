# Checkout direto e senha da loja de desenvolvimento

Lojas de desenvolvimento têm a **senha da loja** ativa. Ao clicar em "Checkout", a Shopify pode mostrar a página
"Enter using password" e, depois da senha, mandar para a página inicial da loja (e o redirecionamento do tema leva ao site).

## Como testar (nesta ordem, um por vez)
1. `site.config.js` → `checkout: { mode: "cn" }`. Vai direto para `/checkouts/cn/...`. Se abrir o checkout sem pedir senha, pronto.
2. Se ainda pedir a senha: `checkout: { mode: "password" }` e cole os dois trechos desta pasta no tema
   (`1-theme.liquid-trecho.liquid` em layout/theme.liquid, `2-password.liquid-trecho.liquid` em layout/password.liquid).
   Fluxo: Checkout → página de senha → você digita → volta sozinho ao checkout. Clicar no nome da loja a partir dali também volta ao checkout (por 30 min).
   Teste em janela anônima: se a loja já estiver "destravada" no navegador, a Shopify pode pular a página de senha.
3. Depois de transferir a loja para o cliente e remover a senha (Loja virtual > Preferências), volte para `mode: "direct"`
   e remova do tema o item 1 do script (checkout pendente), para o nome da loja levar ao site.

Comportamentos da Shopify (senha, redirecionamentos) foram descritos de memória e não testados nesta loja.
