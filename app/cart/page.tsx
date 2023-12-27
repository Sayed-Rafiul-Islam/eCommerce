'use client'

import { useEffect, useState } from "react"
import { cart } from "../actions/cart"

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

  useEffect(()=>{
    const getCartItems = async () => {
      const accessToken : string | null = localStorage.getItem("accessToken")
      const cartItems = await cart(accessToken)
      setCartItems(cartItems)
    }
    getCartItems()
  },[])
  console.log(cartItems)
  return (
    <div>
      <h1 className="text-4xl font-bold text-teal-500 text-center mt-10">Cart</h1>
      <div className="w-11/12 flex mx-auto">
        <div className="w-5/6 bg-slate-400 ">
          table
        </div>
        <div className="w-1/6">
          total cost :
        </div>
      </div>
    </div>
  )
}
