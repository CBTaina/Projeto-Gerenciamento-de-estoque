import { useState, type FormEvent } from 'react'
import { validateProduct } from './productValidation'

export type NewProduct = {
  name: string
  price: number
}

type ProductFormProps = {
  onAdd: (product: NewProduct) => void
}

function ProductForm({ onAdd }: ProductFormProps) {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [errors, setErrors] = useState<ReturnType<typeof validateProduct>>({})

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const validationErrors = validateProduct(name, price)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      return
    }

    onAdd({ name: name.trim(), price: Number(price) })
    setName('')
    setPrice('')
  }

  return (
    <form className="product-form" onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label htmlFor="product-name">Nome do produto</label>
        <input
          id="product-name"
          name="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'product-name-error' : undefined}
        />
        {errors.name && (
          <p className="field-error" id="product-name-error" role="alert">
            {errors.name}
          </p>
        )}
      </div>
      <div className="field">
        <label htmlFor="product-price">Preço (R$)</label>
        <input
          id="product-price"
          name="price"
          type="number"
          min="0"
          step="0.01"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
          aria-invalid={Boolean(errors.price)}
          aria-describedby={errors.price ? 'product-price-error' : undefined}
        />
        {errors.price && (
          <p className="field-error" id="product-price-error" role="alert">
            {errors.price}
          </p>
        )}
      </div>
      <button type="submit">Cadastrar produto</button>
    </form>
  )
}

export default ProductForm
