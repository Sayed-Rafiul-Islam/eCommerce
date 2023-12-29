"use client"

import { UserAuth } from '@/app/context/AuthContext'
import Link from 'next/link'

export default function Navbar() { 
    const {user,logout} = UserAuth()
  return (
    <div className='mt-5'>
      <ul className='w-1/2 text-center mx-auto'>
        <Link prefetch className='mx-5' href='/'>Home</Link>
        {
          user ? 
          <>
            <Link prefetch className='mx-5' href='/cart'>Cart</Link>
            <button className='text-red-500 hover:border-b-2 hover:border-red-500 ml-3' onClick={logout}>Logout</button>
          </>
          : 
          <>
          <Link prefetch className='mx-5' href='/cart'>Cart</Link>
          <Link prefetch  className='mx-5' href='/login'>Log In</Link>
          </>
          
        }
        
        
      </ul>
      
    </div>
  )
}
