"use client";
"use strict";
import * as React from 'react';
import { useEffect, useState } from 'react';
import styles from './Profile.module.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const email = localStorage.getItem('userEmail');
        if (!email) {
          throw new Error('Email is missing');
        }

        const response = await fetch(`/api/profile?email=${encodeURIComponent(email)}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <p>Завантаження...</p>;
  }

  if (error) {
    return <p>Помилка: {error}</p>;
  }

  if (!user) {
    return <p>Користувач не знайдений.</p>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.profile}>
        <div className={styles.avatar}>
          <img className={styles.avatar} src="/profilephoto.png" alt="Avatar" />
          <button className={styles.editProfileButton}>Редагувати профіль</button>
        </div>

        <div className={styles.userData}>
          <h2 className={styles.profileText}>Мій профіль</h2>
          <div className={styles.form}>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.profileLabel}>Ім'я</label>
                <p className={styles.textBox}>{user.firstName}</p>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.profileLabel}>Прізвище</label>
                <p className={styles.textBox}>{user.lastName}</p>
              </div>
            </div>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.profileLabel}>ID</label>
                <p className={styles.textBox}>{user.id || ''}</p>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.profileLabel}>Телефон</label>
                <p className={styles.textBox}>+38{user.phone}</p>
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
        <div className={styles.room}>
          <p>№511</p>
        </div>
        <div className={styles.roomImage}>
          <img src="/8_bed_1st.jpg" alt="Room Image" />
        </div>
      </div>
    </div>
  );
};

export default Profile;
