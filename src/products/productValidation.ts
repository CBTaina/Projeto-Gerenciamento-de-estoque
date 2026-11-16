export type ProductValidationErrors = {
  name?: string
  price?: string
}

export function validateProduct(
  name: string,
  price: string,
): ProductValidationErrors {
  const errors: ProductValidationErrors = {}

  if (!name.trim()) {
    errors.name = 'Informe o nome do produto.'
  }

  if (!price.trim()) {
    errors.price = 'Informe o preço do produto.'
  } else if (!Number.isFinite(Number(price)) || Number(price) <= 0) {
    errors.price = 'Informe um preço maior que zero.'
  }

  return errors
}
