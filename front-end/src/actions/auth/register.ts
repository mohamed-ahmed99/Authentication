"use server"
import { redirect } from "next/navigation"

export const register = async (_:any, formData:FormData) => {

    const email = formData.get('email') as string 
    const firstName = formData.get('First Name') as string 
    const lastName = formData.get('Last Name') as string 
    const age = formData.get('age') as string 
    const phoneNumber = formData.get('phone Number') as string 
    const address = formData.get('address') as string 
    const password = formData.get('password') as string 
    const confirmPassword = formData.get('confirm password') as string 
     

    interface errorsOBJ{ [key:string] : string }
    let errors:errorsOBJ = {}


    /////////////////// check data befor call back-end

    // check email
    if(!email) errors.email = "email is required"
    else if(! (/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email))) errors.email = "invalid gmail"
    
    
    // first name
    if(!firstName) errors.firstName = "first name is required"
    else if(! (/[a-zA-Z]/.test(firstName))) errors.firstName = "invalid name"

    // last name
    if(!lastName) errors.lastName = "last name is required"
    else if(! (/[a-zA-Z]/.test(lastName))) errors.lastName = "invalid name"

    // age
    if(!age) errors.age = "age is required"
    else if(! (/[0-9]/.test(age))) errors.age = "only numbers"
    else if(Number(age) <= 10) errors.age = "user must be +10"
    
    // phone numver
    if(!phoneNumber) errors.phoneNumber = "Phone number is required"
    else if(! (/^(01[0-2,5][0-9]{8}|\+201[0-2,5][0-9]{8})$/.test(phoneNumber))) errors.phoneNumber = "Invalid phone number"
    
    // address
    if(!address) errors.address = "address is required"
    else if(!/^[a-zA-Z]/.test(address)) errors.address = "adress must start with a letter"
    
    // check password
    if(!(/[a-zA-Z]/.test(password))) errors.password = "password must conyain a letter"
    else if(password.length < 8) errors.password = "password must be at least 8 letters"
    
    else if(! (/[0-9]/.test(password))) errors.password = "password must contain a number"
    else if(! (/[^a-zA-Z0-9]/.test(password))) errors.password = "password must contain a special character"

    // confirmPassword
    if(!confirmPassword) errors.confirmPassword = "confirm Password is required"
    else if(confirmPassword !== password) errors.confirmPassword = "confirm Password does not match with password"


    const prevData = {email, firstName, lastName, password, age,phoneNumber, address, confirmPassword}
    if(Object.keys(errors).length > 0) {
        console.log(errors)
        return {errors, goToVerifyCode:false, prevData}
    }




    try{
        const res = await fetch("https://authentication-back-end-two.vercel.app/api/auth/register",{
            method:"POST",
            headers: { "Content-Type": "application/json" },
            body:JSON.stringify(prevData)
        })

        const data = await res.json()
        
        if (res.status == 400 && data.name == 'validator') return {errors:{...data}, goToVerifyCode:false, prevData}
        if (res.status == 400 && data.message) return {message:data.message, prevData, goToVerifyCode: false}

        if (res.status == 201) return {goToVerifyCode: true}
    }
    catch(error){
        console.log(error)
        return { error: String(error), goToVerifyCode: false }
    }
}



    
