// pages/order/booking_detail/[room_id].js
import { useRouter } from 'next/router';
import BookingDetailPage from '../../../components/BookingDetailPage';

const BookingDetail = () => {
  const router = useRouter();
  const { room_id, number, available_places, price, gender, floor } = router.query;

  if (!room_id) {
    return <div>Loading...</div>;
  }

  const room = {
    room_id,
    number,
    available_places,
    price,
    gender,
    floor,
  };

  return <BookingDetailPage room={room} />;
};

export default BookingDetail;
