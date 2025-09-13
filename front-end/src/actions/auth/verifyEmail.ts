"use server"

    

export const verifyEmail = async (_:any, formData:FormData) => {

    let errors:any = {} // object of errors

    const code = (formData.get('code') as string).trim()


    // check code
    if(!code) errors.code = "code is required"
    if(code && code.length < 6) errors.code = "code must be 6 numbers"
   

    // go back with errors
    const prevData = {code}
    if(Object.keys(errors).length > 0) return {errors, goToprofile:false, prevData}

    

}