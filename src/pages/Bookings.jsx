import { Link } from 'react-router-dom'
import { useBookings } from '../BookingsContext.jsx'
import { num, sum } from '../format.js'

export default function Bookings() {
  const { bookings, removeBooking } = useBookings()
  const total = bookings.reduce((acc, b) => acc + b.days * b.price, 0)

  if (bookings.length === 0) {
    return (
      <div className="panel">
        <h1 className="title">Мои аренды</h1>
        <p className="muted">Пока пусто. <Link to="/">Выберите машину</Link></p>
      </div>
    )
  }

  return (
    <div className="panel">
      <h1 className="title">Мои аренды</h1>
      <ul className="list">
        {bookings.map(b => (
          <li key={b.id}>
            <span>{b.name}</span>
            <span className="mono muted">{b.days} × {num(b.price)}</span>
            <b>{sum(b.days * b.price)}</b>
            <button className="x" onClick={() => removeBooking(b.id)} aria-label="Удалить">×</button>
          </li>
        ))}
      </ul>
      <div className="grand">
        <span>Итого</span>
        <b className="mono">{sum(total)}</b>
      </div>
    </div>
  )
}
