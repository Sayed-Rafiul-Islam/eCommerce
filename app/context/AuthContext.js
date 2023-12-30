"use client"
import { useContext, createContext, useState, useEffect } from "react";
import { logIn } from "../actions/logIn";
import { useRouter } from "next/navigation";
import { signUp } from "../actions/signUp";

const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
    const router = useRouter()
    const [user,setUser] = useState(null)
    const [cartItemNumber,setCartItemNumber] = useState(0)


    // sign up 
    const signup  = async (email,password,userName) => {
        const {message,accessToken} = await signUp(email,password,userName)
        if(accessToken){
            localStorage.setItem("accessToken",accessToken)
            setUser(true)
            router.push('/')
            return message
        }
        else{
            return message
        }
      
         
    }

    const login = async (email, password) => {
        const {message,result,accessToken} = await logIn(email,password)
        if(result){
            localStorage.setItem("accessToken",accessToken)
            router.push('/')
            setUser(result)
            return 'hi'
        } 
        else {
            return message;
        }
    }
    const logout = () => {
        localStorage.removeItem("accessToken")
        setUser(false)
        router.push('/')
    }
    useEffect(()=> {
        const isUser = localStorage.getItem("accessToken")
        const isCart = JSON.parse(localStorage.getItem("cart"))
        isUser && setUser(true);
        if (isCart) {
            setCartItemNumber(isCart.length)
        }
    },[])



    return  (
    <AuthContext.Provider value={{user,login,logout,signup,setCartItemNumber,cartItemNumber}}>{children}</AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext)
}