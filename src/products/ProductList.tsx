export type Product = {
  id: string
  name: string
  price: number
}

type ProductListProps = {
  products: Product[]
  onDelete: (id: string) => void
}

const currency = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

function ProductList({ products, onDelete }: ProductListProps) {
  return (
    <section className="product-list-section" aria-labelledby="products-heading">
      <h2 id="products-heading">Produtos cadastrados</h2>
      {products.length === 0 ? (
        <p className="empty-state">Nenhum produto encontrado.</p>
      ) : (
        <ul className="product-list">
          {products.map((product) => (
            <li className="product-item" key={product.id}>
              <div>
                <h3>{product.name}</h3>
                <p>{currency.format(product.price)}</p>
              </div>
              <button
                type="button"
                className="delete-button"
                aria-label={`Excluir ${product.name}`}
                onClick={() => onDelete(product.id)}
              >
                Excluir
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default ProductList
