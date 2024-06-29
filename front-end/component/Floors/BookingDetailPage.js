import { useSearchParams } from 'next/navigation';
import styles from './BookingDetailPage.module.css';
import { useState } from 'react';

const BookingDetailPage = () => {
  const searchParams = useSearchParams();

  const floor = searchParams.get('floor');
  const number = searchParams.get('number');
  const gender = searchParams.get('gender');
  const available_places = searchParams.get('available_places');
  const price = searchParams.get('price');
  const room_id = searchParams.get('room_id');

  const [loading, setLoading] = useState(false);

 const handleBooking = async () => {
   setLoading(true);

   const data = {
     application_id: Math.random().toString(36).substr(2, 9), // generate a random application id
     student_id: 12, // replace with the actual student id
     room_id,
     status: "Submitted",
     application_date: new Date().toISOString(),
     desired_roommates: [], // replace with actual data if needed
   };

   try {
     const response = await fetch('http://127.0.0.1:8000/applications/create/', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify(data),
     });

     if (!response.ok) {
       throw new Error('Network response was not ok');
     }

     const result = await response.json();
     console.log(result);
     alert('Booking successful!');
   } catch (error) {
     console.error('Error during booking:', error);
     //alert(error);
   } finally {
     setLoading(false);
   }
 };



  return (
    <div className={styles.bookingDetailPage}>
      <div className={styles.roomInformation}>
        <h2>Деталі бронювання</h2>
      </div>
      <div className={styles.roomDetails}>
        <div className={styles.roomInfo}>
          <div className={styles.roomDetail}>
            <span className={styles.roomLabel}>Поверх:</span>
            <span className={styles.roomValue}>{floor}</span>
          </div>
          <div className={styles.roomDetail}>
            <span className={styles.roomLabel}>Номер:</span>
            <span className={styles.roomValue}>{number}</span>
          </div>
          <div className={styles.roomDetail}>
            <span className={styles.roomLabel}>Стать:</span>
            <span className={styles.roomValue}>{gender}</span>
          </div>
          <div className={styles.roomDetail}>
            <span className={styles.roomLabel}>Доступних місць:</span>
            <span className={styles.roomValue}>{available_places}</span>
          </div>
          <div className={styles.roomDetail}>
            <span className={styles.roomLabel}>Ціна:</span>
            <span className={styles.roomValue}>{price}$</span>
          </div>
        </div>
        <div className={styles.roomImage}>
          <span className={`${styles.roomLabel} ${styles.roomLabelImage}`}>Кімната:</span>
          <img src='/images/room2.jpg' alt="Room Image" width={100} height={100} />
        </div>
      </div>
      <div className={styles.reservationButton}>
        <button onClick={handleBooking} disabled={loading}>
          {loading ? 'Забронювання...' : 'Забронювати'}
        </button>
      </div>
    </div>
  );
};

export default BookingDetailPage;
