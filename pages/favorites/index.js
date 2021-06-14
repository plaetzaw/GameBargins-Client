import { useContext, useState, useEffect } from 'react'
import { UserContext } from '../components/organisms/UserContext'
import axios from 'axios'

// molecules
import FullGameCard from '../components/molecules/FullGameDealCard'

const FavoritesPage = () => {
  const { user } = useContext(UserContext)
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(async () => {
    try {
      console.log(user)
      if (!user) {
        setError('Please log-in to view your favorites')
      }
      const url = 'http://localhost:8080/viewFavorites'
      const results = await axios.post(url, { userID: user.id })
      setFavorites(results.data)
      // const myfavorites = await setFavorites(results.data)
      // We may have some async issue here
      if (favorites) {
        setLoading(false)
        setError(false)
      }
      console.log('the array length is', favorites.length)
      console.log('here are your favorites', favorites)
    } catch (e) {
      console.error(e)
      setError(error)
    }
    // Passing the length of the array, instead of the array itself, this prevents infinite re-renders
  }, [favorites.length])

  console.log('the array length is', favorites.length)

  return (
    <div>
      {error && <div><h1>{error}</h1></div>}
      {loading && <div><h1>LOADING...</h1></div>}
      <h1>Favorites page</h1>
      {!favorites && <div>To access your favorites, please log-in!</div>}
      {favorites && !loading && <FullGameCard favorites={favorites} setFavorites={setFavorites} />}
    </div>

  )
}

export default FavoritesPage
