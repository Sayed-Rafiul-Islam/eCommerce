"use server"

export const toCart = async (productId: number, accessToken: string | null) => {
   if(accessToken){
    const res = await fetch(`http://localhost:5000/addToCart?accessToken=${accessToken}`, {
        method : "POST",
        headers : {
            "Content-type" : "application/json"
        },
        body : JSON.stringify({productId}),
        cache : "no-store"
    }) 

    return res.status
   } else {
    return 401
   }
}