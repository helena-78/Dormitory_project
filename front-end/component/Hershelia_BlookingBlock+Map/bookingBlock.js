import * as React from 'react';
import { useRouter } from 'next/navigation'


import styles from './BookingBlock.module.css';

const BookingBlock = () => {
  const router = useRouter()

    return (
      <div className={styles.bookingBlock}>
        <div className={styles.icon}>
        <img src="/night_shelter.png" alt="Bed Icon" />
        </div>
        <div className={styles.details}>
          <p>1 місце в трьохмісній кімнаті</p>
          <p>1 місяць / Спільні кухні та душ</p>
          <p>СТАЛА ЦІНА</p>
          <p className={styles.price}>800₴</p>
        </div>
        <button className={styles.bookButton} onClick={() => router.push('/order')}>Забронювати</button>
      </div>
    );
  };
  
  export default BookingBlock;