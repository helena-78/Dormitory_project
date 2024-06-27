"use client";
import * as React from 'react';
import { useEffect, useState } from 'react';
import styles from './Profile.module.css';

const Profile = ({ student_id }) => {
  const [user, setUser] = useState(null); // State to hold user data
  const [loading, setLoading] = useState(true); // Loading state for async operations
  const [error, setError] = useState(null); // Error state if fetching data fails

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const email = localStorage.getItem('userEmail'); // Retrieve stored email
        if (!email) {
          throw new Error('Email is missing');
        }

        console.log('Fetching user data for student_id:', student_id);

        // Fetch user data from backend based on student_id
        const response = await fetch(`http://127.0.0.1:8000/students/${student_id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        console.log('Response status:', response.status);

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const userData = await response.json(); // Parse JSON response
        console.log('User data fetched successfully:', userData);
        setUser(userData); // Update state with fetched user data
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError(error.message); // Update error state if fetch fails
      } finally {
        setLoading(false); // Update loading state once fetch completes (success or failure)
      }
    };

    if (student_id) {
      fetchUserData(); // Invoke fetchUserData function on component mount
    }
  }, [student_id]); // Include student_id in dependency array to re-fetch data when it changes

  if (loading) {
    return <p>Loading...</p>; // Display loading message while fetching data
  }

  if (error) {
    return <p>Error: {error}</p>; // Display error message if fetch fails
  }

  if (!user) {
    return <p>User not found.</p>; // Display message if user data is empty
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
                <p className={styles.textBox}>{user.firstName}</p> {/* Assuming user object structure */}
              </div>
              <div className={styles.formGroup}>
                <label className={styles.profileLabel}>Прізвище</label>
                <p className={styles.textBox}>{user.lastName}</p> {/* Assuming user object structure */}
              </div>
            </div>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.profileLabel}>ID</label>
                <p className={styles.textBox}>{user.student_id}</p> {/* Assuming user object structure */}
              </div>
              <div className={styles.formGroup}>
                <label className={styles.profileLabel}>Телефон</label>
                <p className={styles.textBox}>+38{user.phone}</p> {/* Assuming user object structure */}
              </div>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.profileLabel}>Пошта</label>
              <p className={styles.textBox}>{user.email}</p> {/* Assuming user object structure */}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.Myroom}>
        <h2 className={styles.profileRoom}>Моя кімната</h2>
        <div className={styles.room}>
          <p>{user.room}</p> {/* Assuming user object structure */}
        </div>
        <div className={styles.roomImage}>
          <img src="/8_bed_1st.jpg" alt="Room Image" />
        </div>
      </div>
    </div>
  );
};

export default Profile;
