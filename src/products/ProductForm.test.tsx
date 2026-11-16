import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import ProductForm from './ProductForm'

describe('ProductForm', () => {
  it('shows validation errors and does not submit invalid values', async () => {
    const user = userEvent.setup()
    const onAdd = vi.fn()

    render(<ProductForm onAdd={onAdd} />)
    await user.click(screen.getByRole('button', { name: 'Cadastrar produto' }))

    expect(screen.getByText('Informe o nome do produto.')).toBeInTheDocument()
    expect(screen.getByText('Informe o preço do produto.')).toBeInTheDocument()
    expect(onAdd).not.toHaveBeenCalled()
  })

  it('submits a valid product and resets the fields', async () => {
    const user = userEvent.setup()
    const onAdd = vi.fn()

    render(<ProductForm onAdd={onAdd} />)
    await user.type(screen.getByLabelText('Nome do produto'), '  Caderno  ')
    await user.type(screen.getByLabelText('Preço (R$)'), '12.5')
    await user.click(screen.getByRole('button', { name: 'Cadastrar produto' }))

    expect(onAdd).toHaveBeenCalledWith({ name: 'Caderno', price: 12.5 })
    expect(screen.getByLabelText('Nome do produto')).toHaveValue('')
    expect(screen.getByLabelText('Preço (R$)')).toHaveValue(null)
  })
})
