'use client'

import React, { useEffect } from 'react'
import './room.css'
import Image from 'next/image'
import { useState } from 'react'

const Room = (props) => {

const [isVisible, setIsVisible] = useState(false)
const [isUndefined, setIsUndefined] = useState(false)
const [coordinates, setCoordinates] = useState({x: 0, y: 0})
const [roomColor, setRoomColor] = useState('')

useEffect(() => {
     if (props.item.available_places === 'undefined') {
        setRoomColor('#525252')
        setIsUndefined(true)
     }
     else if(props.item.available_places === 3) {
         setRoomColor('#39b8f7')
     }
     else if (props.item.available_places > 0) {
         setRoomColor('#575afa')
     }
     else {
         setRoomColor('#7300ff')
     }
     

 }, [props.item.available_places])

const showRoomInfo = (event) => {
    setIsVisible(!isVisible)

    const {clientX, clientY} = event
    setCoordinates({x: clientX, y: clientY})
}

return (
    <div className='room-container'>
        {isVisible && !isUndefined && (
            <div className='room-info' style={{
                    top: `${coordinates.y - 300}px`,
                    left: `${coordinates.x - 150}px`,
                }}>
                <Image
                    onClick={() => setIsVisible(false)} 
                    className='close-button'
                    src={'/icons/close.png'}
                    alt='close'
                    width={25}
                    height={25}
                />
                <p className='text-room-info'>
                    Поверх 1, кімната {props.item.number}<br></br>
                    {3 - props.item.available_places}/3 мешканців
                </p>
                <Image 
                    src={'/images/room/img_121.jpg'}
                    alt='room-copmonent'
                    width={150}
                    height={150}
                />
                <button className='room-button'>Забронювати кімнату</button>
            </div>
        )}
        {props.item &&(
        <div className='room-block' onClick={showRoomInfo} style={{backgroundColor: `${roomColor}`}}>
            {!isUndefined &&(
                <div className='room-number'>№{props.item.number}</div>
            )
            }
        </div>
        )
        }
    </div>
)
}

export default Room