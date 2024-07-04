'use client'
import * as React from 'react';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import DynamicList from '../../../../component/AdminPanel/List/DynamicList';
import ArticleIcon from '@mui/icons-material/Article';
import { DynamicSelect } from '../../../../component/AdminPanel/Select/DynamicSelect';

const BASE_URL = 'http://174.129.65.133:8000';

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [students, setStudents] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [bookingsResponse, studentsResponse, roomsResponse] = await Promise.all([
        fetch(`${BASE_URL}/bookings/`),
        fetch(`${BASE_URL}/students/`),
        fetch(`${BASE_URL}/rooms/`)
      ]);

      if (!bookingsResponse.ok || !studentsResponse.ok || !roomsResponse.ok) {
        throw new Error('Failed to fetch data');
      }

      const bookingsData = await bookingsResponse.json();
      const studentsData = await studentsResponse.json();
      const roomsData = await roomsResponse.json();

      setBookings(bookingsData);
      setStudents(studentsData);
      setRooms(roomsData);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const getStudentName = (studentId) => {
    const student = students.find(s => s.student_id === studentId);
    return student ? `${student.name} ${student.surname}` : 'Unknown Student';
  };

  const getRoomNumber = (roomId) => {
    const room = rooms.find(r => r.room_id === roomId);
    return room ? room.number : 'Unknown Room';
  };

  return (
    <>
      <div id="selectContainer">
        <DynamicSelect title={"поверх"} options={["Перший", "Другий", "Третій"]}></DynamicSelect>
      </div>
      <Box className="list">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <DynamicList
            icon={<ArticleIcon sx={{color: '#FFFFFF', transform: 'scale(1.4)'}}></ArticleIcon>}
            items={bookings.map(booking => {
              const studentName = getStudentName(booking.student);
              const roomNumber = getRoomNumber(booking.room);
              return `${studentName} - Room: ${roomNumber} - Status: ${booking.confirmation_status}`;
            })}
            data={bookings}
            title={"бронювань"}
            itemName={"Бронювання"}
          />
        )}
      </Box>
    </>
  );
};

export default BookingsPage;
