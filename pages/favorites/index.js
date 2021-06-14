import { useContext, useState, useEffect } from 'react'
import { Whirly } from 'css-spinners-react'
import axios from 'axios'
import styled from 'styled-components'

// atoms
import { UserContext } from '../components/organisms/UserContext'

// molecules
import FullGameCard from '../components/molecules/FullGameDealCard'

const Spinner = styled.div`
display: flex;
align-items: center;
justify-content: center;
`

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
      {loading ? (<Spinner><Whirly /></Spinner>) : (null)}
      <h1>Favorites page</h1>
      {!favorites && <div>To access your favorites, please log-in!</div>}
      {favorites && !loading && <FullGameCard favorites={favorites} setFavorites={setFavorites} />}
    </div>

  )
}

export default FavoritesPage
