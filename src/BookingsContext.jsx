import { createContext, useContext, useEffect, useState } from 'react'

const BookingsContext = createContext(null)

export function BookingsProvider({ children }) {
  const [bookings, setBookings] = useState(() => {
    try { return JSON.parse(localStorage.getItem('bookings')) || [] } catch { return [] }
  })

  useEffect(() => {
    localStorage.setItem('bookings', JSON.stringify(bookings))
  }, [bookings])

  function addBooking(car, days) {
    setBookings(prev => [...prev, { id: Date.now(), carId: car.id, name: car.name, price: car.price, days }])
  }

  function removeBooking(id) {
    setBookings(prev => prev.filter(b => b.id !== id))
  }

  return (
    <BookingsContext.Provider value={{ bookings, addBooking, removeBooking }}>
      {children}
    </BookingsContext.Provider>
  )
}

export const useBookings = () => useContext(BookingsContext)
