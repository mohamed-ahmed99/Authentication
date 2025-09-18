"use server"

export const Login = async (_:any, formData:FormData) => {

    const email = formData.get('email') as string 
    const password = formData.get('password') as string 
     

    interface errorsOBJ{ [key:string] : string }
    let errors:errorsOBJ = {}


    /////////////////// check data befor call back-end

    // check email
    if(!email) errors.email = "email is required"
    else if(! (/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email))) errors.email = "invalid gmail"
    
    
 
    // check password
    if(!password) errors.password = "password is required"
    else if(password.length < 8) errors.password = "password must be at least 8 letters"
    


    const prevData = {email, password}
    if(Object.keys(errors).length > 0) return {errors, goToVerifyCode:false, prevData}


        try{
            const res = await fetch("https://authentication-back-end-two.vercel.app/api/auth/login",{
                method:"POST",
                headers: { "Content-Type": "application/json" },
                body:JSON.stringify(prevData)
        })

        let data;
            try {
                data = await res.json();
            } catch {
                const text = await res.text(); 
                data = { message: text };
            }
                    
        console.log(data)
        if (res.status == 404 || res.status == 401) return {message:data.message, goToProfile:false, prevData}

        if (res.status == 201) return {goToProfile: true}
    }
    catch(error){
        console.log(error)
        return { message: String(error), goToProfile: false, prevData }
    }


    
}