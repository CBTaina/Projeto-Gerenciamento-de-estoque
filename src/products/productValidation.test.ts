import { describe, expect, it } from 'vitest'
import { validateProduct } from './productValidation'

describe('validateProduct', () => {
  it('requires a product name and price', () => {
    expect(validateProduct('   ', '')).toEqual({
      name: 'Informe o nome do produto.',
      price: 'Informe o preço do produto.',
    })
  })

  it.each(['abc', '0', '-1'])('rejects invalid price %s', (price) => {
    expect(validateProduct('Caderno', price)).toEqual({
      price: 'Informe um preço maior que zero.',
    })
  })

  it('accepts a trimmed name and a positive decimal price', () => {
    expect(validateProduct(' Caderno ', '12.5')).toEqual({})
  })
})
