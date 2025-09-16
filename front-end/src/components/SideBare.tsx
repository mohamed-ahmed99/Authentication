"use client"
import Link from "next/link"
import {motion} from 'framer-motion'
import { useState } from "react"





export default function SideBare({openList, setOpenList}:any) {


    const LinkComponents = [
        {text:"personal info", href: '/'},
        {text:"security", href: '/'},
        {text:"setting", href: '/'},
    ]

    const createLinks = LinkComponents.map((link, index) => {
        return <motion.div key={index} whileHover={{scaleX:1.06}}>
            <Link href={link.href}
                className="p-2 bg-gray-300 w-full block rounded-md capitalize">{link.text}</Link>
        </motion.div>
    })





    return (
        <motion.div initial={{x:'-100%'}} animate={openList? {x:0} : {x:'-100%'}} 
             className="bg-gray-100 h-screen w-[260px] shadow-xl shadow-gray-300 p-4 space-y-2 fixed z-[999]">

            <div className="text-right">
                <button onClick={() => setOpenList(false)}
                    className="text-[20px] h-[35px] w-[35px] border hover:shadow-lg border-gray-300 hover:bg-gray-300 rounded-full">X</button>
            </div> 
            
            <ul className="space-y-2 py-2 ">{createLinks}</ul>

            <button
                className="logOutBtn absolute bottom-5 bg-gray-300 p-2 w-[88%] rounded-md left-1/2 hover:bg-red-800 hover:text-white
                    ">log out</button>
            
        </motion.div>
    )
}