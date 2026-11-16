# Gerenciador de produtos

Aplicação React para cadastrar produtos com nome e preço, pesquisar pelo nome e
excluir produtos cadastrados.

## Executar localmente

```sh
npm install
npm run dev
```

## Testes

Os testes unitários e de componentes usam Vitest e Testing Library:

```sh
npm test
```

Os testes ponta a ponta usam Playwright com Chromium. Instale o navegador uma
vez e execute a suíte:

```sh
npx playwright install chromium
npm run test:e2e
```

Para validar tipos e gerar a versão de produção:

```sh
npm run build
```
