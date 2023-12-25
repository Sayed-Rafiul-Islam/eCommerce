"use client"
import { useEffect, useState } from "react"

interface Product {
    id : number,
    name : string,
    category : string,
    price : number,
    image : string
}
export default  function Products() {
    const [products, setProducts] = useState([]);
    useEffect(()=> {
        const getProducts = async () => {
            const res = await fetch(`http://localhost:5000/products`)
            const products = await res.json()
            setProducts(products)
        }
        getProducts();
    },[])
    
   

    const addToCart = (id : number) => {
        console.log(id)
    }
  return (
    <div className="grid grid-cols-3">
        {   products.length !== 0 &&
            products.map((product : Product) =>
                <div className="mx-auto my-4" key={product.id}>
                    <img height={200} width={200} src={product.image} alt="" />
                    <h2 className="text-lg font-bold">{product.name}</h2>
                    <p className="text-xs text-gray-400">Category : {product.category}</p>
                    <p className="text-teal-300 text-sm">Price : ${product.price}</p>
                    <button className="text-sm text-teal-500 border-teal-500 border-2 p-2 rounded-lg mt-3 hover:bg-teal-500 hover:text-white transition-colors" onClick={()=>addToCart(product.id)}>Add to Cart</button>
                </div>
            )
        }
    </div>
  )
}
