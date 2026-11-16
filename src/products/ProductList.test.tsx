import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import ProductList from './ProductList'

describe('ProductList', () => {
  it('shows an empty state when there are no products', () => {
    render(<ProductList products={[]} onDelete={vi.fn()} />)

    expect(screen.getByText('Nenhum produto encontrado.')).toBeInTheDocument()
  })

  it('renders products and notifies when one is deleted', async () => {
    const user = userEvent.setup()
    const onDelete = vi.fn()
    render(
      <ProductList
        products={[{ id: 'product-1', name: 'Caderno', price: 12.5 }]}
        onDelete={onDelete}
      />,
    )

    expect(screen.getByRole('heading', { name: 'Caderno' })).toBeInTheDocument()
    expect(screen.getByText(/^R\$\s*12,50$/)).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Excluir Caderno' }))

    expect(onDelete).toHaveBeenCalledWith('product-1')
  })
})
