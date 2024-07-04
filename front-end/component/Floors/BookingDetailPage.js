import { useSearchParams } from 'next/navigation';
import styles from './BookingDetailPage.module.css';
import { useState, useEffect } from "react";
import {useBooking} from '../../component/context/BookingContext';

const BookingDetailPage = () => {
  const { bookingDetails } = useBooking();
  const {roomData, setRoomData} = useState({});
  const [studentId, setStudentId] = useState(null);
  const [roomId, setRoomId] = useState(null);
  const [item, setItem] = useState({});
  const ENDPOINT = '/rooms';
  //const searchParams = useSearchParams();
  // const floor = searchParams.get('floor');
  // const number = searchParams.get('number');
  // const gender = searchParams.get('gender');
  // const available_places = searchParams.get('available_places');
  // const price = searchParams.get('price');

  const floor = item.floor;
  const number = item.number;
  const gender = item.gender;
  const available_places = item.available_places;
  const price = item.price;

  useEffect(() => {
    const sId = localStorage.getItem('student_id');
    const rId = localStorage.getItem('room_id');
    setStudentId(sId);
    setRoomId(rId);

    const url = `${process.env.NEXT_PUBLIC_API_URL}${ENDPOINT}/${rId}/`;
    fetch(url)
      .then((data) => data.json())
      .then((data) => {
        // Modify the images field in the data
        const modifiedData = data.map(item => {
          if (item.images) {
            item.images = `data:image/jpeg;base64,${item.images}`;
          }
          return item;
        });
        return modifiedData;
      })
      .then((modifiedData) => setItem(modifiedData))

  })


  const base_url=process.env.NEXT_PUBLIC_API_URL

  const [loading, setLoading] = useState(false);

  const handleBooking = async () => {
    setLoading(true);
    const applicationData = {
      student: studentId,
      room: roomId,
      status: 'Submitted',
    }

    // const bookingData = {
    //   booking_id: 3, // generate a random booking id
    //   student_id: 3, // replace with the actual student id
    //   room_id: parseInt(number), // assuming 'number' is the room_id
    //   booking_date: new Date().toISOString(),
    //   confirmation_status: "Pending",
    // };

    try {
      const response = await fetch(`${base_url}/applications/create/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(applicationData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network response was not ok: ${errorText}`);
      }

      const result = await response.json();
      console.log(result);
      alert('Booking successful!');

      const patchResponse = await fetch(`${base_url}/students/${studentId}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({application: result.application_id}),
      });
  
      if (!patchResponse.ok) {
        const errorText = await patchResponse.text();
        throw new Error(`Network response was not ok: ${errorText}`);
      }
  
      const patchResult = await patchResponse.json();
      console.log('Student application_id updated:', patchResult);

    } catch (error) {
      console.error('Error during booking:', error);
      alert(`Booking failed, please try again. Error: ${error.message}`);
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
          <img src={item.images ? item.images : '/images/room2.jpg'} alt="Room Image" width={100} height={100} />
        </div>
      </div>
      <div className={styles.reservationButton}>
        <button onClick={handleBooking} disabled={loading}>
          {loading ? 'Завантаження...' : 'Забронювати'}
        </button>
      </div>
    </div>
  );
};

export default BookingDetailPage;
