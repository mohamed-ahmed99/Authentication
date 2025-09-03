"use client"
import { useActionState } from "react"
import LabelInput from "../../../components/LabelInput"
import { register } from "../../../actions/auth/register"


export default function LogIn () {

    const [state, action, isPending] = useActionState(register, undefined)
    console.log(state)

    return (
        <div className="p-4 min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="p-6 bg-white w-full max-w-[700px] rounded-xl space-y-8">

                <h2 className="text-center text-4xl capitalize font-Merienda">register</h2>

                {/* form */}
                <form action={action} className="space-y-4">

                    {/* user name */}
                    <div className="flex gap-4">
                        <LabelInput label="First Name" type="text" placeholder="user name" defaultValue={state?.prevData?.firstName}/>
                        <LabelInput label="Last Name" type="text" placeholder="user Last name" defaultValue={state?.prevData?.lastName}/>
                    </div>

                    {/* age,  phoneNumber*/}
                    <div className="flex gap-4">
                        <LabelInput label="age" type="text" placeholder="10+" defaultValue={state?.prevData?.age}/>
                        <LabelInput label="phone Number" type="text" placeholder="user Last name" defaultValue={state?.prevData?.phoneNumber}/>
                    </div>

                    <LabelInput label="address" type="text" placeholder="example _ example _ example" defaultValue={state?.prevData?.address}/>
                    <LabelInput label="email" type="text" placeholder="example@_gmail.com" defaultValue={state?.prevData?.email}/>

                    <LabelInput label="password" type="password" placeholder="***************" defaultValue={state?.prevData?.password}/>
                    <LabelInput label="confirm password" type="password" placeholder="***************" defaultValue={state?.prevData?.confirmPassword}/>
                    
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