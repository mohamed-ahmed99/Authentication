"use server"
import { redirect } from "next/navigation"

export const login = async (_:any, formData:FormData) => {

    const email = formData.get('email') as string 
    const password = formData.get('password') as string 
     

    interface errorsOBJ{ [key:string] : string }
    let errors:errorsOBJ = {}


    /////////////////// check data befor call back-end

    // check email
    if(!email) errors.email = "email is required"
    else if(! (/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email))) errors.email = "invalid gmail"

    // check password
    if(password.length < 8) errors.password = "password must be at least 8 letters"
    
    
    const prevData = { email, password }
    if(Object.keys(errors).length > 0) return {errors, goToVerifyCode:false, prevData}


}



    
