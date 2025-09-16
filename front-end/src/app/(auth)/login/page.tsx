"use client"
import { useActionState, useEffect } from "react"
import { useRouter } from "next/navigation"

import Alert from '../../../components/Alert'
import LabelInput from "../../../components/LabelInput"
import { login } from "../../../actions/auth/login"




export default function LogIn () {

    const router = useRouter()

    const [state, action, isPending] = useActionState(login, undefined)
  


    return (
        <div className="p-4 min-h-screen bg-gray-100 flex items-center justify-center overflow-hidden">
            <div className="p-6 bg-white w-full max-w-[600px] rounded-xl space-y-8">

                <h2 className="text-center text-4xl capitalize font-Merienda">login</h2>

                {/* form */}
                <form action={action} className="space-y-4">

                    <LabelInput label="email" type="text" placeholder="example@_gmail.com" defaultValue={state?.prevData?.email} error={state?.errors?.email}/>

                    <LabelInput label="password" type="password" placeholder="***************" defaultValue={state?.prevData?.password} error={state?.errors?.password}/>
                    
                    {/* submition btn */}
                    <button type="submit" disabled={isPending} 
                        className="p-[10px] bg-black text-white w-full rounded-lg font-semibold capitalize tracking-wide">
                            {isPending ? 'submiting...' : 'submit'}
                    </button>
                </form>
            </div>

            
        </div>
    )
}