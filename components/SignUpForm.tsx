"use client"

import { signUp } from "@/app/actions/signUp"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function SignUpForm() {
    const router = useRouter()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userName, setUserName] = useState('')

    const [ message, setMessage] = useState('')

    const handleSubmit = async () => {
        if(userName === '' || password === '' || email === '') {
            setMessage("Empty field exists")
        }
        else {
            setMessage("Signing up...")
            const message = await signUp(email,password,userName)
            setMessage(message)
            router.push('/')
        }
        
    }
  return (
    <div className="flex flex-col gap-4 p-4 w-1/2 mx-auto">
        <label htmlFor="Name">User Name :</label>
        <input required className="text-black" type="text" value={userName} onChange={(e)=> setUserName(e.target.value)} />
        <label htmlFor="Email">Email :</label>
        <input required className="text-black" type="email" value={email} onChange={(e)=> setEmail(e.target.value)} />
        <label htmlFor="Password">Password :</label>
        <input required className="text-black" type="password" value={password} onChange={(e)=> setPassword(e.target.value)} />

        <button className="rounder-lg border-blue-500 border-b-2 w-1/4 p-4 mx-auto hover:text-blue-400" onClick={handleSubmit}>
            Sign Up
        </button>

        <p className="text-white">
            {message}
        </p>
      
    </div>
  )
}
