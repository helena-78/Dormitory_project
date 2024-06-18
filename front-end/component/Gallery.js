'use client'

import Image from 'next/image'
import { useState } from 'react'

const images = [
    "/images/gallery/img_1.jpg",
    "/images/gallery/img_2.jpg",
    "/images/gallery/img_3.jpg",
    "/images/gallery/img_4.jpg",
    "/images/gallery/img_5.jpg",
    "/images/gallery/img_6.jpg",
    "/images/gallery/img_7.jpg",
    "/images/gallery/img_8.jpg",
    "/images/gallery/img_9.jpg",
    "/images/gallery/img_10.jpg",
]

export const Gallery = () => {
    const [min, setMin] = useState(0)
    const [max, setMax] = useState(5)

    const limitedImages = images.slice(min, max)

    const viewForward = () => {
        if (images.length <= max) {
            return
        }
        setMin(min + 1)
        setMax(max + 1)
    }

    const viewBack = () => {
        if (min == 0) {
            return
        }
        setMin(min - 1)
        setMax(max - 1)
    }
  return (
    <div className='gallery'>
        <div className="scroll-button-l" onClick={viewBack}>
            <Image
                src='/icons/arrow_forward_black.png'
                width={50}
                height={50}
             />
        </div>
        {limitedImages.map((image, index) => (            
            <div className='g-item'>
                <Image 
                    key={index}
                    src={image}
                    alt="Description" 
                    layout="fill" 
                    objectFit="cover" 
                />
            </div>
        ))}
        <div className="scroll-button-r" onClick={viewForward}> 
            <Image
                src='/icons/arrow_forward_black.png'
                width={50}
                height={50}
            />
        </div>         
    </div>

    

    
  )
}


