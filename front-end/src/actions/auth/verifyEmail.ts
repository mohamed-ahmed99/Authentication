"use server"
interface errorsOBJ{ [key:string] : string }
    

export const verifyEmail = async (_:any, formData:FormData) => {

    let errors:errorsOBJ = {} // object of errors

    const email = (formData.get("email") as string).trim()
    const password = (formData.get("password") as string).trim()



    /////////////////// check data befor call back-end

    // check email
    if(!email) errors.email = "email is required"
    else if(! (/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email))) errors.email = "invalid gmail"
    
    // check password
    if(!password) errors.password = "password is required"
    else if(password.length < 6) errors.password = "short password"

    // go back with errors
    const prevData = {email, password}
    if(Object.keys(errors).length > 0) return {errors, goToprofile:false, prevData}

    

}