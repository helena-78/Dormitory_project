'use client'

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {useBooking} from '../../component/context/BookingContext';
import './room.css';

const Room = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isUndefined, setIsUndefined] = useState(false);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const [roomColor, setRoomColor] = useState('');
  const router = useRouter();
  const { setBookingDetails } = useBooking();

  useEffect(() => {
    if (props.item.available_places === 'undefined') {
      setRoomColor('#525252');
      setIsUndefined(true);
    } else if (props.item.available_places === 3) {
      setRoomColor('#39b8f7');
    } else if (props.item.available_places > 0) {
      setRoomColor('#575afa');
    } else {
      setRoomColor('#7300ff');
    }
  }, [props.item.available_places]);

  const showRoomInfo = (event) => {
    setIsVisible(!isVisible);
    const { clientX, clientY } = event;
    setCoordinates({ x: clientX, y: clientY });
  };

  const handleBookingClick = () => {
    // const params = new URLSearchParams({
    //   room_id: props.item.room_id.toString(),
    //   number: props.item.number,
    //   available_places: props.item.available_places,
    //   price: props.item.price,
    //   gender: props.item.gender,
    //   floor: props.item.floor.toString(),
    // });

    // router.push(`/order/booking_detail?${params.toString()}`);

    setBookingDetails({
      room_id: props.item.room_id.toString(),
      number: props.item.number,
      available_places: props.item.available_places,
      price: props.item.price,
      gender: props.item.gender,
      floor: props.item.floor.toString(),
    })
    router.push(`/order/booking_detail`)
  }

  return (
    <div className='room-container'>
      {isVisible && !isUndefined && (
        <div
          className='room-info'
          style={{
            top: `${coordinates.y - 300}px`,
            left: `${coordinates.x - 150}px`,
          }}
        >
          <Image
            onClick={() => setIsVisible(false)}
            className='close-button'
            src={'/icons/close.png'}
            alt='close'
            width={25}
            height={25}
          />
          <p className='text-room-info'>
            Поверх 1, кімната {props.item.number}<br />
            {3 - props.item.available_places}/3 мешканців
          </p>
          <Image
            src={'/images/room/img_121.jpg'}
            alt='room-component'
            width={150}
            height={150}
          />
          <button className='room-button' onClick={handleBookingClick}>
            Забронювати кімнату
          </button>
        </div>
      )}
      {props.item && (
        <div
          className='room-block'
          onClick={showRoomInfo}
          style={{ backgroundColor: `${roomColor}` }}
        >
          {!isUndefined && (
            <div className='room-number'>№{props.item.number}</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Room;
