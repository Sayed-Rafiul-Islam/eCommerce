'use client'

import { useEffect, useState } from "react"
import { cart } from "../actions/cart"
import deleteProduct from "../actions/deleteItem"
import { useRouter } from "next/navigation"

interface Order {
    productId : string,
    productName : string,
    image : string,
    quantity : number,
    price : number,
    totalPrice : number
}

export default function Cart() {
  const [cartItems,setCartItems] = useState([])
  let [cost,setCost] = useState(0)
  const router = useRouter()

  useEffect(()=>{
    const getCartItems = async () => {
      const accessToken : string | null = localStorage.getItem("accessToken")
      const cartItems = await cart(accessToken)
      setCartItems(cartItems)
      let totalCost = 0;
      cartItems.map((cartItem : Order)=> {
        totalCost = totalCost +cartItem.totalPrice
      })
      setCost(totalCost)
    }
    getCartItems()
  },[cartItems.length])  

  const removeItem = async (productId : string) => {
      const accessToken : string | null = localStorage.getItem("accessToken")
      const data = await deleteProduct(productId,accessToken)
      if(data === 200) {
        alert("Item Removed")
        setCartItems([])
      } else {
        alert("Unable to Remove Item")
      }
      
  }

  return (
    <div>
      <h1 className="text-4xl font-bold text-teal-500 text-center my-10">Cart</h1>
      <div className="w-11/12 flex mx-auto">
        <div className="w-2/3">
          <table className="w-full">
            <thead>
              <th>Serial No</th>
              <th>Product</th>
              <th>Thumbneil</th>
              <th>Price per Unit</th>
              <th>Quantity</th>
              <th>Total</th>
              <th> </th>
            </thead>
           
            <tbody className="text-center">
              {
                cartItems.length > 0 && 
                cartItems.map(({productId,productName,image,price,quantity,totalPrice},index)=>
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{productName}</td>
                      <td><img className="rounded-full mx-auto" height={80} width={80} src={image} alt="" /></td>
                      <td>${price}</td>
                      <td>{quantity}</td>
                      <td>${totalPrice}</td>
                      <td><button onClick={()=>removeItem(productId)} className="text-red-400 hover:text-red-600">Delete</button></td>
                    </tr>
                )
              }
              </tbody>
          </table>
        </div>
        <div className="w-1/3">
          <h3 className="text-center text-xl">Total Cost : ${cost}</h3>
        </div>
      </div>
    </div>
  )
}
