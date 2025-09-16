"use client"
import { useState } from 'react'

import SideBare from '../../components/SideBare'
import MyPost from './MyPost'

export default function Profile() {

    // to open or close list of settings
    const [openList, setOpenList] = useState(false)

    return (

    <>
        {/* side bare component */}
        <SideBare openList={openList} setOpenList={setOpenList}/>
        
        <div className="overflow-hidden max-w-[1280px] m-auto">

            
            {/* user photo and background */}
            <div className='relative h-[210px]'>
                <div className='bg-gray-100 p-4 h-[180px]'></div>
                <div className='h-[180px] w-[180px] bg-gray-300 rounded-full absolute bottom-0 left-4'></div>
            </div>


            {/* user name, bio and btn of settings  */}
            <div>
                <div className='px-6 py-4 flex items-center justify-between'>
                    <div>
                        <h2 className='text-[30px] capitalize'>mohamed ahmed salah</h2>
                        <p className='text-gray-600'>one line about you one line about you one line about you one line about you one line about you </p>
                    </div>
                    <button onClick={() => setOpenList(prev => !prev)}
                        title="setting" className='block h-[30px] w-[30px] hover:bg-gray-200 rounded-full'>@</button>
                </div>
            </div>

            {/* who I am */}
            <div className='px-8 my-6 '>
                <h3 className='text-center text-[25px]'>Who I am?</h3>
                <p className='text-gray-600 '>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores eligendi dolore tempora autem. In magni voluptatum voluptatibus atque rerum repellat aliquid optio laborum animi dolore doloribus voluptates, ad harum quasi earum nam! Mollitia pariatur exercitationem repellat fuga debitis saepe reiciendis ratione, assumenda accusamus dolores eos perspiciatis numquam explicabo facilis iusto id voluptatem blanditiis modi ab vel est hic. Recusandae consequuntur voluptatem officia totam nobis magni sapiente earum, culpa veritatis amet asperiores perspiciatis ut eos. Esse architecto at neque laboriosam tempore voluptatibus quasi iure debitis qui, ad repellat placeat. Quam est omnis a earum incidunt itaque molestias ipsam consequuntur, consectetur ab.</p>
            </div>

            <div className='p-8 space-y-8'>
                <MyPost/>
                <MyPost/>
                <MyPost/>
            </div>
        </div>

        </>
    )
}