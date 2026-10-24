import { NavLink, Route, Routes } from 'react-router-dom'
import { useBookings } from './BookingsContext.jsx'
import Catalog from './pages/Catalog.jsx'
import CarPage from './pages/CarPage.jsx'
import Bookings from './pages/Bookings.jsx'

export default function App() {
  const { bookings } = useBookings()
  return (
    <div className="app">
      <header className="header">
        <NavLink to="/" className="logo">Avto<span>Ijara</span></NavLink>
        <nav className="nav">
          <NavLink to="/" end className="pill">Главная</NavLink>
          <NavLink to="/bookings" className="pill">
            Мои аренды{bookings.length > 0 && <b className="badge">{bookings.length}</b>}
          </NavLink>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Catalog />} />
          <Route path="/car/:id" element={<CarPage />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="*" element={<p className="muted">Страница не найдена</p>} />
        </Routes>
      </main>
    </div>
  )
}
