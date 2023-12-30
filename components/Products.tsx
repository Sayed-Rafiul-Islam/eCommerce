"use client"
import { UserAuth } from "@/app/context/AuthContext"
import { useEffect, useState } from "react"

interface Product {
    productId : number,
    productName : string,
    category : string,
    price : number,
    image : string
}
interface CartItem {
    productId : number,
    productName : string,
    image : string,
    price : number,
    quantity : number
}
export default  function Products() {
    const {setCartItemNumber}= UserAuth()
    const [cart,setCart] = useState<CartItem[] | []>([]) 
    const [cartUpdate, setCartUpdate] = useState(false);
    const [products, setProducts] = useState<Product[] | []>([]);
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(0);
    const pages = Array.from(Array(pageCount).keys())


    //  page count
    useEffect(()=>{
        const getPageCount = async () => {
            const response = await fetch(`http://localhost:5000/pageCount`)
            const pageCount = await response.json()
            setPageCount(pageCount)
        }
        getPageCount()
    },[])

    // Products
    useEffect(()=> {
        const getProducts = async () => {
            const res = await fetch(`http://localhost:5000/products?page=${page}`)
            const products = await res.json()
            setProducts(products)
        }
        getProducts();
    },[page])

    // cart
    useEffect(()=>{
        const oldCart = localStorage.getItem("cart")
        
            if (cart.length === 0) {
                if(oldCart) {    
                    setCart(JSON.parse(oldCart))
                } 
            } else {
                localStorage.setItem("cart",JSON.stringify(cart))
            }
            setCartItemNumber(cart.length)
    },[cartUpdate])


    
    
    const addToCart = async (productId : number,image : string, price : number,productName : string) => {
        alert("Item added to cart")
            const index = cart.findIndex((item)=> item.productId === productId)
            if(index === -1) {
                setCart(
                    [...cart,
                        { productId: productId,productName : productName, image : image, price : price, quantity: 1 }
                    ]
                    );
            } else {
                cart[index].quantity += 1;
            }
        setCartUpdate(!cartUpdate)

        

        

        // const accessToken : string | null = localStorage.getItem("accessToken")

        // const status : number = await toCart(productId,accessToken);
        // if( status === 401) {
        //     alert('Unauthorized Access. Please log in')
        //     router.push('/login')
            
        // }
        // else if ( status === 403) {
        //     alert('Session expired. Please re-loggin')
        //     router.push('/login')
        // }
        // else {
        //     alert("Item added to Cart")
        // }       
    }
  return (
    <div>
        <div className="grid grid-cols-3">
        {   products.length !== 0 &&
            products.map(({productId,productName,image,category,price} : Product) =>
                <div className="mx-auto my-4" key={productId}>
                    <img height={200} width={200} src={image} alt="" />
                    <h2 className="text-lg font-bold">{productName}</h2>
                    <p className="text-xs text-gray-400">Category : {category}</p>
                    <p className="text-teal-300 text-sm">Price : ${price}</p>
                    <button className="text-sm text-teal-500 border-teal-500 border-2 p-2 rounded-lg mt-3 hover:bg-teal-500 hover:text-white transition-colors" onClick={()=>addToCart(productId,image,price,productName)}>Add to Cart</button>
                </div>
            )
        } 
        </div>
        <div className='flex justify-center pb-10'>
            {
                pages.map((number,index) => 
                <button 
                    key={index}
                    onClick={()=>setPage(number)} 
                    className={page === number
                    ? 'px-3 py-1 mx-1 rounded-lg text-white bg-teal-500' 
                    : 'px-2 mx-1 rounded-lg border-2 border-teal-500 text-teal-500 hover:text-white hover:bg-teal-500 transition-all'}
                    >{number + 1}
                </button>
                )
            }
        </div>
    </div>
    
  )
}
