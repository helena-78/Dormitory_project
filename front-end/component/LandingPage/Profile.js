// pages/profile.js
import * as React from 'react';


import styles from './Profile.module.css'

const Profile = () => {
  return (
          
    <div className={styles.container}>
    <div className={styles.profile}>
      <div className={styles.avatar}>
        <img className={styles.avatar} src="/profilephoto.png" alt="Avatar" />
      </div>
      <div className={styles.userData}>
        <h2 className={styles.profileText}>Мій профіль</h2>
        <div className={styles.form}>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.profileLabel}>Ім'я</label>
              <p className={styles.textBox}>Іван</p>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.profileLabel}>Прізвище</label>
              <p className={styles.textBox}>Іванов</p>
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.profileLabel}>ID</label>
              <p className={styles.textBox}>12345</p>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.profileLabel}>Телефон</label>
              <p className={styles.textBox}>0999999999</p>
            </div>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.profileLabel}>Пошта</label>
            <p className={styles.textBox}>ivanov@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
    <div className={styles.Myroom}>
    <h2 className={styles.profileRoom}>Моя кімната</h2>
    <div className={styles.room}>
      <p>№511</p>
    </div>
    </div>
    
  </div>
  );
};

export default Profile;
