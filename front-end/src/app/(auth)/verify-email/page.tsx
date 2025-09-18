"use client"
import { useActionState, useEffect, useRef, useState } from "react"
import { useAppContext } from "../../appContext"
import {motion} from 'framer-motion'
import Alert from '../../../components/Alert'
import { useRouter } from "next/navigation"
import {verifyEmail} from '../../../actions/auth/verifyEmail'


export default function VerifyCode() {

    const {store} = useAppContext()
    const router = useRouter()
    const [state, action, isPending] = useActionState(verifyEmail, undefined)


    const inputsRefs = useRef<(HTMLInputElement | null)[]>([])
    const [code, setCode] = useState<string[]>(['','','','','',''])


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value.replace(/[^0-9]/g, '')
        
        const newCode = [...code]
        newCode[index] = value ? value[0] : ''
        setCode(newCode)
        
        if(value && index < 5) inputsRefs.current[index += 1]?.focus()
    }
    
    const handelKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if(e.key === "Backspace" && index > 0 && !code[index]) {
            inputsRefs.current[index -= 1]?.focus()
        }
    }

    useEffect(() => {
        if(state?.goToProfile) router.push('/profile')
        
    },[state])



    
  return (
    <div className="p-4 min-h-screen bg-gray-100 flex items-center justify-center overflow-hidden">

      {state?.message && <Alert message={state.message}/>}

      <div className="p-6 bg-white w-full max-w-[700px] rounded-xl space-y-8">
        <h2 className="text-center text-4xl capitalize font-Merienda">verify email</h2>

        <form action={action} className="space-y-4">

            <div className="flex justify-center gap-3">
                    {code.map((digit:string, index:number) => (
                        <input type="text" maxLength={1} key={index} value={digit}
                            ref={(el) => {inputsRefs.current[index] = el}}
                            onChange={(e) => handleChange(e, index)}
                            onKeyDown={(e) => handelKeyDown(e, index)}

                            className="w-8 h-8 sm:w-12 sm:h-12 border border-gray-300 rounded-lg text-center text-xl focus:outline-none focus:ring-2 focus:ring-black"
                        />
                    ))}
            </div>


            {/* becouse use action state used with name */}
            <input type="hidden" value={code.join("")} name="code"/>
            <input type="hidden" value={store.unVerifiedEmail} name="email"/>


            {state?.errors?.code && 
                <motion.p initial={{x:-50}} animate={{x:0}} transition={{type:"spring", stiffness:500}}
                className="text-red-600 text-sm text-center">{state?.errors?.code}</motion.p>
            }
          <button
            type="submit"
            className="p-[10px] bg-black text-white w-full rounded-lg font-semibold capitalize tracking-wide"
          >
           {isPending ? 'sending...' : 'send'}
          </button>
        </form>

      </div>
    </div>
  )


}



