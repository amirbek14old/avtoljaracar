import { useEffect, useState } from 'react'

export function useCars() {
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('/cars.json')
      .then(res => {
        if (!res.ok) throw new Error('Не удалось загрузить машины')
        return res.json()
      })
      .then(setCars)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  return { cars, loading, error }
}
