import { createContext, useContext, useEffect, useState } from 'react';

const BookingContext = createContext();

export const useBooking = () => useContext(BookingContext);

export const BookingProvider = ({ children }) => {
  const [bookingDetails, setBookingDetails] = useState({});

  // Fetch initial booking details from localStorage if available
  useEffect(() => {
    const storedBookingDetails = localStorage.getItem('bookingDetails');
    if (storedBookingDetails) {
      setBookingDetails(JSON.parse(storedBookingDetails));
    }
  }, []);

  // Update localStorage whenever bookingDetails changes
  useEffect(() => {
    localStorage.setItem('bookingDetails', JSON.stringify(bookingDetails));
  }, [bookingDetails]);

  return (
    <BookingContext.Provider value={{ bookingDetails, setBookingDetails }}>
      {children}
    </BookingContext.Provider>
  );
};
