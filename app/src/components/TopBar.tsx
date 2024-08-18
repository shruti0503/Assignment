import React from 'react'
import { FileQuestionIcon } from 'lucide-react'
import { MessageCircleHeart } from 'lucide-react'
import { UploadCloud } from 'lucide-react'
import { ArrowDown } from 'lucide-react'
import logo from '../assets/logo.png'
import { AtSignIcon } from 'lucide-react'
const TopBar = () => {
  return (
    <div className=' topbar w-[100%] flex border-b-2 border-[#d3d3d3]-400  font-semibold p-5 items-center justify-between'>
        <div className='flex gap-1 icon'>
            <FileQuestionIcon/>
            <p>About</p>
            <ArrowDown />

        </div>
        <div className='flex text-lg main items-center' >
            <img src={logo} />
             <p>Chat.io</p>
        </div>

        <div className='flex gap-4 icon'>
            <div className='flex gap-1 cursor-pointer'>
                <UploadCloud /> <p>Upload</p>
            </div>

            <div className='flex gap-1'>
                <AtSignIcon /> <p>Sign in</p>

            </div>

        </div>
      
    </div>
  )
}

export default TopBar
