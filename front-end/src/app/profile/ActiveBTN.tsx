"use client"

interface ActiveBtnType{
    content:string
}

export default function ActiveBTN ({content} : ActiveBtnType){

    return (
        <button 
            className="block hover:bg-gray-200 p-2 rounded-full">{content}
        </button>
    )
}