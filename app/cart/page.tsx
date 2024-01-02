'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { handleCheckout } from "../actions/handleCheckout"
import { useUserAuth } from "../context/AuthContext"

interface Cart {
  productId : number,
  image : string,
  productName : string,
  price : number,
  quantity : number
}

interface Order {
    productId : number,
    productName : string,
    price : number,
    quantity : number
}

export default function Cart() {
  const [cartItems,setCartItems] = useState<Cart[] | []>([])
  const [updateCart,setUpdateCart] = useState(false)
  let [cost,setCost] = useState(0)
  const {setCartItemNumber,user} = useUserAuth()
  const router = useRouter()

  useEffect(()=>{
    const isCart = localStorage.getItem("cart")
      if(isCart) {
        setCartItems(JSON.parse(isCart));
        cartItems.map(({price,quantity} : Order)  =>{
          cost = cost + price*quantity
          setCost(cost)
          setCartItemNumber(cartItems.length)
        })
      }
  },[cartItems.length,updateCart])  

  const removeItem = async (id : number) => {
    const tempCart = cartItems.filter(({productId})=> productId !== id)
    setCost(0)
    setCartItems(tempCart)
    localStorage.setItem("cart",JSON.stringify(tempCart))
    alert("Item removed !")
    tempCart.length === 0 && setCartItemNumber(0)
  }

  const handleEmptyCart = () => {
    alert("Cart Emptied")
    localStorage.removeItem("cart")
    setCartItems([])
    setCost(0)
    setCartItemNumber(0)
  }



  const updateItem = (id : number, data : boolean) => {
    const index = cartItems.findIndex(({productId})=> productId === id)
    if (data) {
      cartItems[index].quantity += 1;
      setCartItems(cartItems)
      localStorage.setItem("cart",JSON.stringify(cartItems))
    } else {
      if(cartItems[index].quantity > 1) {
        cartItems[index].quantity -= 1;
        setCartItems(cartItems)
        localStorage.setItem("cart",JSON.stringify(cartItems))
      } else {
        alert("Quantity cannot be zero, You can delete the item insted!")
      }
    }
    setCost(0)
    setUpdateCart(!updateCart)  
    
  }

  const handleCheckOut = async () => {
    const accessToken = localStorage.getItem("accessToken")
    const orderId = Math.floor(Math.random()*1000000)
    const order_date = new Date()
    const date  = order_date.toISOString().split("T")[0]
    const orders = JSON.stringify(cartItems)
    if(!user) {
      router.push('/login')
    } else {

      const status : number = await handleCheckout(orderId,accessToken,date,orders,cost)
      if(status === 200) {
        alert("Items Ordered")
        handleEmptyCart()
      } else {
        alert("Something went wrong")
      }

      // cartItems.map(async ({productId,quantity})=>{
      //   const order = {
      //     orderId,
      //     productId,
      //     accessToken,
      //     order_date,
      //     quantity
      //   } 
      
      // console.log(status)
      // })
     
    }
    
  }


  return (
    <div>
      <h1 className="text-4xl font-bold text-teal-500 text-center my-10">Cart</h1>
      <div className="w-11/12 flex mx-auto">
        <div className="w-2/3">
          <table className="w-full">
            <thead>
            <tr>
              <th>Serial No</th>
              <th>Product</th>
              <th>Thumbneil</th>
              <th>Price per Unit</th>
              <th>Quantity</th>
              <th>Total</th>
              <th> </th>
            </tr>
            </thead>
            
           
            <tbody className="text-center">
              {
                cartItems.length > 0 && 
                cartItems.map(({productId,productName,image,price,quantity},index)=>{
                  console.log()
                  return <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{productName}</td>
                  <td><img className="rounded-full mx-auto" height={80} width={80} src={image} alt="" /></td>
                  <td>${price}</td>
                  <td>
                    <button onClick={()=>updateItem(productId,true)} className="text-2xl mr-2 hover:text-green-500">+</button> 
                    {quantity} 
                    <button onClick={()=>updateItem(productId,false)} className="text-2xl ml-2 hover:text-red-500">-</button>
                  </td>
                  <td>${price*quantity}</td>
                  <td><button onClick={()=>removeItem(productId)} className="text-red-400 hover:text-red-600">Delete</button></td>
                </tr>
                }
                    
                )
              }
              </tbody>
          </table>
        </div>
        <div className="w-1/3">
          <h3 className="text-center text-xl">Total Cost : ${cost}</h3>
          {
            cartItems.length > 0 &&
            <div className="flex justify-evenly mt-10">
            <button className="text-green-400 hover:text-green-600" onClick={handleCheckOut}>Check Out</button>
            <button className="text-red-400 hover:text-red-600" onClick={handleEmptyCart}>Empty Cart</button>
          </div>
          }
          
        </div>
      </div>
    </div>
  )
}
