import { Link } from 'react-router-dom'
import { useCars } from '../useCars.js'
import { sum } from '../format.js'
import CarImage from '../components/CarImage.jsx'

export default function Catalog() {
  const { cars, loading, error } = useCars()

  if (loading) return <p className="muted">Загрузка…</p>
  if (error) return <p className="error">{error}</p>

  return (
    <>
      <h1 className="title">Аренда машин <em>в Ташкенте</em></h1>
      <p className="muted">Выберите машину и количество дней.</p>
      <div className="grid">
        {cars.map(car => (
          <Link key={car.id} to={`/car/${car.id}`} className="card">
            <CarImage color={car.color} body={car.body} />
            <h3>{car.name}</h3>
            <p className="muted small">{car.type} · {car.seats} мест · {car.gear}</p>
            <p className="price">{sum(car.price)} <span>/ день</span></p>
          </Link>
        ))}
      </div>
    </>
  )
}
