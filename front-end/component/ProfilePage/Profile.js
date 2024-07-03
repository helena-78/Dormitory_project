"use client";
import * as React from 'react';
import { useEffect, useState } from 'react';
import {useBooking} from '../../component/context/BookingContext';
import { useParams } from 'next/navigation';
import styles from './Profile.module.css';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const Profile = () => {
  const {bookingDetails} = useBooking()
  const [user, setUser] = useState(null);
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  

  useEffect(() => {
    const student_id = bookingDetails.student_id
    if (student_id) {
      fetchUser(student_id);
    } else {
      setError('Student ID not found in local context');
      setLoading(false);
    }
  }, []);

  const fetchUser = async (student_id) => {
    try {
      const response = await fetch(`${BASE_URL}/students/${student_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        setError('Failed to fetch user data from server');
      }
    } catch (error) {
      setError('Connection error with server');
    } finally {
      setLoading(false);
    }
  };

  const fetchRoom = async (room_id) => {
    try {
      const response = await fetch(`${BASE_URL}/rooms/${room_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setRoom(data);
      } else {
        setError('Failed to fetch room data from server');
      }
    } catch (error) {
      setError('Connection error with server');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!user) {
    return <p>User not found.</p>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.profile}>
        <div className={styles.avatar}>
          <img className={styles.avatar} src="/profilephoto.png" alt="Avatar" />
          {/* <button className={styles.editProfileButton}>Редагувати профіль</button> */}
        </div>

        <div className={styles.userData}>
          <h2 className={styles.profileText}>Мій профіль</h2>
          <div className={styles.form}>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.profileLabel}>Ім'я</label>
                <p className={styles.textBox}>{user.name}</p>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.profileLabel}>Прізвище</label>
                <p className={styles.textBox}>{user.surname}</p>
              </div>
            </div>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.profileLabel}>ID</label>
                <p className={styles.textBox}>{user.student_id}</p>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.profileLabel}>Телефон</label>
                <p className={styles.textBox}>+(380){user.contact_number}</p>
              </div>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.profileLabel}>Пошта</label>
              <p className={styles.textBox}>{user.email}</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.Myroom}>
        <h2 className={styles.profileRoom}>Моя кімната</h2>
        <p>{user.room_id ? fetchRoom(user.room_id) : "Немає закріпленої кімнати"}</p>
        {room &&(
          <>
              <p>Номер: {room.number}</p>
              <p>Доступні місця: {room.available_places}</p>
              <p>Ціна: {room.price} UAH</p>
              <p>Стать: {room.gender}</p>
              {room.images && (
                <div className={styles.roomImage}>
                  <img src={`data:image/jpeg;base64,${room.images}`} alt="Room" />
                </div>
              )}
            </>
        )}
      </div>
    </div>
  );
};

export default Profile;
