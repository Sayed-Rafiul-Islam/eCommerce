"use client"

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Navbar() {
    const router = useRouter()
    const [user,setUser]= useState<Boolean>()
    useEffect(() => {
      const user = localStorage.getItem("accessToken") ? true : false
      setUser(user)
    }, [])
    

    const handleLogout = () => {
      localStorage.removeItem("accessToken")
      setUser(false)
      router.refresh()
    }


  
  return (
    <div className='mt-5'>
      <ul className='w-1/2 text-center mx-auto'>
        <Link prefetch className='mx-5' href='/'>Home</Link>
        {
          user ? 
          <>
            <Link prefetch className='mx-5' href='/cart'>Cart</Link>
            <button className='text-red-500 hover:border-b-2 hover:border-red-500 ml-3' onClick={handleLogout}>Logout</button>
          </>
          : 
          <Link prefetch  className='mx-5' href='/login'>Log In</Link>
        }
        
        
      </ul>
    </div>
  )
}
