import { useState } from "react"

function Product({ id, title, price, image, discount, description, purchases, stock, selectedProduct, handleSelect }) {
  const [productPrice, setProductPrice] = useState(price)

  // useEffect(() => {
  //   console.log(`Product ${name} mounted!`)
  // }, []) // L'array vuoto fa si che l'effetto venga eseguito solo al montaggio

  // useEffect(() => {
  //   console.log(`Price updated!`)
  // }, [productPrice]) // L'array con dipendenze fa si che l'effetto venga rieseguito ogniqualvolta esse cambino

  // useEffect(() => {
  //   console.log(`Product ${name} re-rendered!`)
  // }) // Se non inserisco le dipendenze questo effetto verrà rieseguito ad ogni render

  // useEffect(() => {
  //   const handleMouseMove = event => {
  //     console.log("X: " + event.clientX + " Y: " + event.clientY)
  //   }
  //   window.addEventListener("mousemove", handleMouseMove)

  //   // Clean up function - Avviene quando il componente viene smontato
  //   return () => {
  //     window.removeEventListener("mousemove", handleMouseMove)
  //   }
  // }, [])

  const discountedPrice = discount > 0 ? productPrice - (productPrice * discount) / 100 : productPrice

  const isSelected = id === (selectedProduct && selectedProduct.id)

  return (
    <div className={`product ${stock === 0 ? "out-of-stock" : ""} ${isSelected ? "selected" : ""}`} onClick={() => handleSelect({ id })}>
      <img src={image} alt={title} className="" />
      <h2>{title}</h2>
      <p>
        Prezzo: ${discount > 0 ? <s>{productPrice}</s> : productPrice} {discount > 0 && "--> " + discountedPrice.toFixed(2)}
      </p>
      <p>{description || "No Description"}</p>
      <p>Purchased {purchases ?? "No data available"}</p>
      <button onClick={() => setProductPrice(currentPrice => currentPrice + 10)}>Aggiorna Prezzo</button>
      <button>Aggiungi al carrello</button>
    </div>
  )
}

export default Product
