"use client"
import { useActionState, useEffect } from "react"
import LabelInput from "../../../components/LabelInput"
import {Login} from '../../../actions/auth/login'
import Alert from "../../../components/Alert"
import { useRouter } from "next/navigation"

export default function login(){

    const router = useRouter()
    const [state, action, isPending] = useActionState(Login, undefined)

     useEffect(() => {
        if(state?.goToVerifyCode)  {
            return router.push('/profile')
        }
        if(state?.message)  window.scrollTo({top:0, behavior:"smooth"})
    }, [state])
   


    return (
        <div className="p-4 min-h-screen bg-gray-100 flex items-center justify-center overflow-hidden">
            <div className="p-6 bg-white w-full max-w-[600px] rounded-xl space-y-8">
        
                <h2 className="text-center text-4xl capitalize font-Merienda">register</h2> 
                    {/* form */}
                    <form action={action} className="space-y-4">  

                        <LabelInput label="email" type="text" placeholder="example@_gmail.com" defaultValue={state?.prevData?.email} error={state?.errors?.email}/>
                        <LabelInput label="password" type="password" placeholder="***************" defaultValue={state?.prevData?.password} error={state?.errors?.password}/>
                            
                        {/* submition btn */}
                        <button type="submit" 
                            className="p-[10px] bg-black text-white w-full rounded-lg font-semibold capitalize tracking-wide">
                                {isPending ? 'submiting...' : 'submit'}
                        </button>
                    </form>
            </div>
        
            {state?.message && <Alert message={state.message}/> }
                    
        </div>
    )
}


