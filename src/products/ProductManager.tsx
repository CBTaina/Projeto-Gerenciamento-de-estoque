import { useMemo, useState } from 'react'
import ProductForm, { type NewProduct } from './ProductForm'
import ProductList, { type Product } from './ProductList'

function ProductManager() {
  const [products, setProducts] = useState<Product[]>([])
  const [search, setSearch] = useState('')

  function addProduct(product: NewProduct) {
    setProducts((current) => [
      ...current,
      { ...product, id: crypto.randomUUID() },
    ])
  }

  function deleteProduct(id: string) {
    setProducts((current) => current.filter((product) => product.id !== id))
  }

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLocaleLowerCase('pt-BR')
    return products.filter((product) =>
      product.name.toLocaleLowerCase('pt-BR').includes(query),
    )
  }, [products, search])

  return (
    <main className="product-manager">
      <header className="page-header">
        <p className="eyebrow">CATÁLOGO</p>
        <h1>Gerenciador de produtos</h1>
        <p>Cadastre e organize seus produtos em um só lugar.</p>
      </header>

      <section className="panel" aria-labelledby="new-product-heading">
        <h2 id="new-product-heading">Cadastrar produto</h2>
        <ProductForm onAdd={addProduct} />
      </section>

      <section className="panel" aria-label="Busca de produtos">
        <label className="search-label" htmlFor="product-search">
          Pesquisar produtos
        </label>
        <input
          id="product-search"
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Digite o nome do produto"
        />
      </section>

      <div className="panel">
        <ProductList products={filteredProducts} onDelete={deleteProduct} />
      </div>
    </main>
  )
}

export default ProductManager
