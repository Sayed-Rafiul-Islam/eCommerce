"use client"

import { logIn } from "@/app/actions/logIn"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LogInForm() {
    const router = useRouter()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [ message, setMessage] = useState('')

    const handleSubmit = async () => {
        if(password === '' || email === '') {
            setMessage("Empty field exists")
        }
        else {
            setMessage("Logging In...")
            const {message,result,accessToken} = await logIn(email,password)
            if(result){
                localStorage.setItem("accessToken",accessToken)
                router.push('/')
                setMessage(message)
            } 
            else {
                setMessage(message)
            }
            
        }
        
    }
  return (
    <div className="flex flex-col gap-4 p-4 w-1/2 mx-auto">
        <label htmlFor="Email">Email :</label>
        <input required className="text-black" type="email" value={email} onChange={(e)=> setEmail(e.target.value)} />
        <label htmlFor="Password">Password :</label>
        <input required className="text-black" type="password" value={password} onChange={(e)=> setPassword(e.target.value)} />
        <p className="text-red-500 text-end">
            {message}
        </p>
        <button className="rounder-lg border-blue-500 border-b-2 w-1/4 p-4 mx-auto hover:text-blue-400" onClick={handleSubmit}>
           Log In
        </button>

        <p>Don't have an Account ? <Link href='/signup' className="text-blue-400 hover:font-bold">Go to Sign Up</Link></p>

        
      
    </div>
  )
}
