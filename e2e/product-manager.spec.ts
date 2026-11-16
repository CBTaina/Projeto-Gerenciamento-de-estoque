import { expect, test } from '@playwright/test'

test('cadastra, pesquisa e exclui um produto', async ({ page }) => {
  await page.goto('/')

  await page.getByLabel('Nome do produto').fill('Caneca azul')
  await page.getByLabel('Preço (R$)').fill('24.9')
  await page.getByRole('button', { name: 'Cadastrar produto' }).click()
  await expect(page.getByRole('heading', { name: 'Caneca azul' })).toBeVisible()

  const search = page.getByRole('searchbox', { name: 'Pesquisar produtos' })
  await search.fill('caneca')
  await expect(page.getByRole('heading', { name: 'Caneca azul' })).toBeVisible()

  await search.fill('inexistente')
  await expect(page.getByText('Nenhum produto encontrado.')).toBeVisible()

  await search.fill('caneca')
  await page.getByRole('button', { name: 'Excluir Caneca azul' }).click()
  await expect(page.getByText('Nenhum produto encontrado.')).toBeVisible()
})
