"use client"
import { toCart } from "@/app/actions/toCart";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

interface Product {
    productId : number,
    productName : string,
    category : string,
    price : number,
    image : string
}
export default  function Products() {
    const [products, setProducts] = useState<Product[] | []>([]);
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(0);
    const pages = Array.from(Array(pageCount).keys())
    const router = useRouter()


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


    
   

    const addToCart = async (productId : number) => {

        const accessToken : string | null = localStorage.getItem("accessToken")

        const status : number = await toCart(productId,accessToken);
        console.log(status)

        if( status === 401) {
            alert('Unauthorized Access. Please Sign in')
            
        }
        else if ( status === 403) {
            alert('Session expired. Please re-loggin')
            router.push('/login')
        }
        else {
            alert("Item added to Cart")
        }       
    }
  return (
    <div>
        <div className="grid grid-cols-3">
        {   products.length !== 0 &&
            products.map((product : Product) =>
                <div className="mx-auto my-4" key={product.productId}>
                    <img height={200} width={200} src={product.image} alt="" />
                    <h2 className="text-lg font-bold">{product.productName}</h2>
                    <p className="text-xs text-gray-400">Category : {product.category}</p>
                    <p className="text-teal-300 text-sm">Price : ${product.price}</p>
                    <button className="text-sm text-teal-500 border-teal-500 border-2 p-2 rounded-lg mt-3 hover:bg-teal-500 hover:text-white transition-colors" onClick={()=>addToCart(product.productId)}>Add to Cart</button>
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
