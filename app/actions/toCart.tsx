"use server"

export const toCart = async (productId: number, accessToken: string | null) => {
    const res = await fetch(`http://localhost:5000/addToCart`, {
        method : "POST",
        headers : {
            "Content-type" : "application/json"
        },
        body : JSON.stringify({productId,accessToken}),
        cache : "no-store"
    }) 

    return res.status
}