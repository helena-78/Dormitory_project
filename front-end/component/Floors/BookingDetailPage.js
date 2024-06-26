import { useSearchParams } from 'next/navigation';
import styles from './BookingDetailPage.module.css';

const BookingDetailPage = () => {
  const searchParams = useSearchParams();

  const floor = searchParams.get('floor');
  const number = searchParams.get('number');
  const gender = searchParams.get('gender');
  const available_places = searchParams.get('available_places');
  const price = searchParams.get('price');

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
        <button>Забронювати</button>
      </div>
    </div>
  );
};

export default BookingDetailPage;
