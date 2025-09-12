"use client"
import { useActionState, useEffect } from "react"
import { useRouter } from "next/navigation"

import Alert from '../../../components/Alert'
import LabelInput from "../../../components/LabelInput"
import { register } from "../../../actions/auth/register"
import {useAppContext} from '../../appContext'




export default function LogIn () {

    const router = useRouter()
    const {store, setStore} = useAppContext()

    const [state, action, isPending] = useActionState(register, undefined)
    console.log(state)

    useEffect(() => {
        if(state?.goToVerifyCode)  {
            setStore("unVerifiedEmail", state.email)
            return router.push('/verify-code')
        }
        if(state?.message)  window.scrollTo({top:0, behavior:"smooth"})
    }, [state])



    return (
        <div className="p-4 min-h-screen bg-gray-100 flex items-center justify-center overflow-hidden">
            <div className="p-6 bg-white w-full max-w-[700px] rounded-xl space-y-8">

                <h2 className="text-center text-4xl capitalize font-Merienda">register</h2>

                {/* form */}
                <form action={action} className="space-y-4">

                    {/* user name */}
                    <div className="flex gap-4">
                        <LabelInput label="First Name" type="text" placeholder="user name" defaultValue={state?.prevData?.firstName} error={state?.errors?.firstName}/>
                        <LabelInput label="Last Name" type="text" placeholder="user Last name" defaultValue={state?.prevData?.lastName} error={state?.errors?.lastName}/>
                    </div>

                    {/* age,  phoneNumber*/}
                    <div className="flex gap-4">
                        <LabelInput label="age" type="text" placeholder="10+" defaultValue={state?.prevData?.age} error={state?.errors?.age}/>
                        <LabelInput label="phone Number" type="text" placeholder="user Last name" defaultValue={state?.prevData?.phoneNumber} error={state?.errors?.phoneNumber}/>
                    </div>

                    <LabelInput label="address" type="text" placeholder="example _ example _ example" defaultValue={state?.prevData?.address} error={state?.errors?.address}/>
                    <LabelInput label="email" type="text" placeholder="example@_gmail.com" defaultValue={state?.prevData?.email} error={state?.errors?.email}/>

                    <LabelInput label="password" type="password" placeholder="***************" defaultValue={state?.prevData?.password} error={state?.errors?.password}/>
                    <LabelInput label="confirm password" type="password" placeholder="***************" defaultValue={state?.prevData?.confirmPassword} error={state?.errors?.confirmPassword}/>
                    
                    {/* submition btn */}
                    <button type="submit" disabled={isPending} 
                        className="p-[10px] bg-black text-white w-full rounded-lg font-semibold capitalize tracking-wide">
                            {isPending ? 'submiting...' : 'submit'}
                    </button>
                </form>
            </div>

            {state?.message && <Alert message={state.message}/> }
            
        </div>
    )
}