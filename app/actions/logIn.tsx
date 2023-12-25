"use server"

export const logIn = async (email : string, password : string) => {
        const splittedEmail = email.split(".com")
        const res = await fetch(`http://localhost:5000/users?email=${splittedEmail[0]}&password=${password}`)
        const result = await res.json()
        return result
}
