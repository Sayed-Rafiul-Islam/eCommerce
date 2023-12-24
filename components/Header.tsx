
import Link from 'next/link'
import React from 'react'

export default function Navbar() {
  return (
    <div className='mt-5'>
      <ul className='w-1/2 text-center mx-auto'>
        <Link className='mx-5' href='/'>Home</Link>
        <Link className='mx-5' href='/cart'>Cart</Link>
        <Link className='mx-5' href='/signup'>Sign Up</Link>
      </ul>
    </div>
  )
}
