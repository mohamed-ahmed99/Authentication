"use client"
import { useActionState, useEffect } from "react"
import LabelInput from "../../../components/LabelInput"
import {verifyEmail} from '../../../actions/auth/verifyEmail'
import {useAppContext} from '../../appContext'

export default function VerifyCode (){

    const {store} = useAppContext()
    const [state, action, isPending] = useActionState(verifyEmail, undefined)

    useEffect(() => console.log(store),[])



    return (
        <div className="p-4 min-h-screen bg-gray-100 flex items-center justify-center overflow-hidden">
            <div className="p-6 bg-white w-full max-w-[700px] rounded-xl space-y-8">
            
                <h2 className="text-center text-4xl capitalize font-Merienda">verify email</h2>

                <form action={action} className="space-y-4">
                    <LabelInput label="password" type="string" placeholder="****************" defaultValue={state?.prevData?.password} error={state?.errors?.password}/>

                    <button type="submit"
                            className="p-[10px] bg-black text-white w-full rounded-lg font-semibold capitalize tracking-wide">
                        {isPending ? 'submiting...' : 'submit'} 
                    </button>
                </form>
            </div>
        </div>
    )
}

