"use server"

import { log } from "console";

export const signUp = async (email: string, password: string, userName: string) => {
    const res = await fetch(`http://localhost:5000/addUser`, {
        method : "POST",
        headers : {
            "Content-type" : "application/json"
        },
        body : JSON.stringify({email,password,userName})
    }) 
    const {message} = await res.json(); 

    return message
}
