
import ActiveBTN from "./ActiveBTN"

export default function MyPost() {

    const x = true

    return (
        <div className="w-full py-2 max-w-[750px] bg-gray-100 m-auto shadow-lg rounded border border-gray-200 shadow-gray-200">

            {/* date */}
            <span className="text-sm text-[#200] px-2">15/9/2025</span>

            {/* content */}
            <div>
                <p className="p-2 text-sm text-gray-700 tracking-[.4px]">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit animi aperiam perferendis unde laborum recusandae sint earum magni amet consequatur expedita aliquid quod cupiditate dolorem sed aliquam rem, repellendus suscipit?</p>
                {x && <img src='post.png'/>}
            </div>

            {/* active */}
            <div className="flex items-center justify-between pb-2 pt-3 px-4 ">
                <ActiveBTN content="Like"/>
                <ActiveBTN content="comment"/>
                <ActiveBTN content="share"/> 
            </div>
        </div>
    )
}