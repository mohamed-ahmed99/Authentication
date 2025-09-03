


interface LabelInput {
    label: string,
    type: string,
    placeholder: string,
    defaultValue: string | undefined,
}

export default function LabelInput({label, type, placeholder, defaultValue} : LabelInput) {
    
    return(
            <label className="block space-y-2 flex-grow">
                {/* label text */}
                <p className="cursor-pointer capitalize">{label}</p>

                {/* input */}
                <input type={type} name={label} placeholder={placeholder} defaultValue={defaultValue}
                    className="outline-none border border-gray-400 w-full py-[10px] px-4 rounded-lg"/>
            </label>
    )
}