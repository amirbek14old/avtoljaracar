import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useCars } from '../useCars.js'
import { useBookings } from '../BookingsContext.jsx'
import { num, sum } from '../format.js'
import CarImage from '../components/CarImage.jsx'

export default function CarPage() {
  const { id } = useParams()
  const { cars, loading, error } = useCars()
  const { addBooking } = useBookings()
  const [days, setDays] = useState(1)
  const navigate = useNavigate()

  if (loading) return <p className="muted">Загрузка…</p>
  if (error) return <p className="error">{error}</p>

  const car = cars.find(c => c.id === Number(id))
  if (!car) return <p className="muted">Машина не найдена. <Link to="/">В каталог</Link></p>

  function rent() {
    addBooking(car, days)
    navigate('/bookings')
  }

  return (
    <div className="detail">
      <Link to="/" className="back">← Каталог</Link>
      <div className="detail-box">
        <CarImage color={car.color} body={car.body} big />
        <div>
          <h1 className="title">{car.name}</h1>
          <p className="muted">{car.type} · {car.seats} мест · {car.gear}</p>
          <p className="price">{sum(car.price)} <span>/ день</span></p>

          <p className="label">Сколько дней?</p>
          <div className="days">
            <button onClick={() => setDays(d => Math.max(1, d - 1))} disabled={days <= 1}>−</button>
            <span>{days}</span>
            <button onClick={() => setDays(d => Math.min(30, d + 1))} disabled={days >= 30}>+</button>
          </div>

          <div className="total-row">
            <span className="mono">{days} × {num(car.price)}</span>
            <b>{sum(days * car.price)}</b>
          </div>
          <button className="btn" onClick={rent}>Арендовать</button>
        </div>
      </div>
    </div>
  )
}
