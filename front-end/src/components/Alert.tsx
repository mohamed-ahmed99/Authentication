import {motion} from 'framer-motion'

export default function Alert ({message} : {message:string}) {

    const handleMessage = message.charAt(0).toUpperCase() + message.slice(1)

    return (
        <motion.div initial={{x:500}} animate={{x:0}} transition={{duration:.3, delay:.2, type:'spring', stiffness:200}}
            className="absolute top-8 right-8 min-w-[300px]  p-4 rounded-xl text-center text-white bg-blue-300
                font-semibold shadow-xl ">{handleMessage}
        </motion.div>
    )

}