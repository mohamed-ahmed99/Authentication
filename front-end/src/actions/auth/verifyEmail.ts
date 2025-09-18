"use server"

export const verifyEmail = async (_:any, formData:FormData) => {

    let errors:any = {} // object of errors

    const code = (formData.get('code') as string).trim()
    const email = (formData.get('email') as string).trim()


    // check code
    if(!code) errors.code = "code is required"
    if(code && code.length < 6) errors.code = "code must be 6 numbers"
   

    // go back with errors
    const prevData = {code}
    if(Object.keys(errors).length > 0) return {errors, goToprofile:false, prevData}

    
    // call back-end
    try{
        const res = await fetch("https://authentication-back-end-two.vercel.app/api/auth/verifyEmail",{
            method:"POST",
            headers: { "Content-Type": "application/json" },
            body:JSON.stringify({code, email}),
            credentials:"include"
        })

        let data;
        try{
            data = await res.json()
        }catch(error){
            const textError = await res.text()
            data = {message: textError}
        }

        if(res.status == 404 || res.status == 401) return {message: data.message, goToProfile:false, prevData}
        if(res.status == 200) return {goToProfile: true}
        


    }
    catch(error){
        return { error: String(error), goToProfile: false }
    }

}

