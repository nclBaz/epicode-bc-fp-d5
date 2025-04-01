import { useEffect, useState } from "react"
import "./App.css"
import Product from "./components/Product"
import { PacmanLoader } from "react-spinners"
import "bootstrap/dist/css/bootstrap.min.css"
import { Alert } from "react-bootstrap"

// const products = [
//   {
//     id: 0,
//     name: "Prodotto 1",
//     price: 19.99,
//     image: "https://prd.place/300/200?id=1",
//     discount: 0,
//     description:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, numquam dolores! Eum, autem laborum. Ab neque nisi totam, quis libero, officia aliquid excepturi ipsum esse corrupti non. Voluptates, aliquid fuga.",
//     purchases: 0,
//     stock: 20,
//   },
//   {
//     id: 1,
//     name: "Prodotto 2",
//     price: 9.99,
//     image: "https://prd.place/300/200?id=2",
//     discount: 10,
//     description:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, numquam dolores! Eum, autem laborum. Ab neque nisi totam, quis libero, officia aliquid excepturi ipsum esse corrupti non. Voluptates, aliquid fuga.",
//     stock: 0,
//   },
//   {
//     id: 2,
//     name: "Prodotto 3",
//     price: 1.99,
//     image: "https://prd.place/300/200?id=3",
//     discount: 50,
//     description:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, numquam dolores! Eum, autem laborum. Ab neque nisi totam, quis libero, officia aliquid excepturi ipsum esse corrupti non. Voluptates, aliquid fuga.",
//     purchases: 10,
//     stock: 0,
//   },
//   { id: 3, name: "Prodotto 4", price: 29.99, image: "https://prd.place/300/200?id=4", discount: 0, purchases: 50, stock: 100 },
//   { id: 4, name: "Prodotto 5", price: 59.99, image: "https://prd.place/300/200?id=5", discount: 30, purchases: 50, stock: 100 },
//   { id: 5, name: "Prodotto 6", price: 5.99, image: "https://prd.place/300/200?id=6", discount: 20, purchases: 0, stock: 100 },
//   { id: 6, name: "Prodotto 7", price: 5.99, image: "https://prd.place/300/200?id=7", discount: 30, purchases: 50, stock: 100 },
//   { id: 7, name: "Prodotto 8", price: 5.99, image: "https://prd.place/300/200?id=8", discount: 40, purchases: 50, stock: 100 },
//   { id: 8, name: "Prodotto 9", price: 5.99, image: "https://prd.place/300/200?id=9", discount: 50, purchases: 0, stock: 100 },
//   { id: 9, name: "Prodotto 10", price: 5.99, image: "https://prd.place/300/200?id=10", discount: 10, purchases: 50, stock: 100 },
// ]

function App() {
  const [products, setProducts] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [showProducts, setShowProducts] = useState(true)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // fetch("https://fakestoreapi.com/products?limit=20")
    //   .then(response => response.json())
    //   .then(products => console.log(products))
    const fetchProducts = async () => {
      try {
        setLoading(true)
        // await new Promise(res => setTimeout(res, 3000)) <-- Per simulare un ritardo nella risposta alla fetch
        const response = await fetch("https://fakestoreapi.com/productsss?limit=20")
        const products = await response.json()
        if (!response.ok) throw new Error("HTTP ERROR!")
        setProducts(products)
      } catch (error) {
        console.log(error)
        setError("Errore durante il fetch dei prodotti")
      } finally {
        // Finally serve per eseguire del codice a prescindere se ci sia stato un errore oppure no
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const handleSelect = selected => {
    setSelectedProduct(selected)
  }

  return (
    <>
      {loading && <PacmanLoader />}
      {error && <Alert>❌ Error: {error}</Alert>}
      {!error && (
        <button
          onClick={() => {
            setShowProducts(() => !showProducts)
          }}
        >
          SHOW PRODUCTS
        </button>
      )}

      {!error && showProducts && products.length > 0
        ? products.map(product => <Product key={product.id} {...product} selectedProduct={selectedProduct} handleSelect={handleSelect} />)
        : !error && <div>NO PRODUCTS FOUND</div>}
    </>
  )
}

export default App
