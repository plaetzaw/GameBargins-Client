import { useContext, useState, useEffect } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'

// import { Whirly } from 'css-spinners-react'
import axios from 'axios'
import styled from 'styled-components'

// atoms
import { UserContext } from '../components/organisms/UserContext'

// molecules
import FullGameCard from '../components/molecules/FullGameDealCard'

// organisms
import Alerts from '../components/organisms/Alerts'

const Spinner = styled.div`
display: flex;
align-items: center;
justify-content: center;
`

const FavoritesPage = () => {
  const { user } = useContext(UserContext)
  const [favorites, setFavorites] = useState([])
  const [alerts, setAlerts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(async () => {
    try {
      if (!user) {
        setError('Please log-in to view your favorites')
      }
      const getFavorites = 'http://localhost:8080/viewFavorites'
      const getAlerts = 'http://localhost:8080/getAlerts'
      // const FavoritesData = await Promise.all([axios.post(getFavorites, { userID: user.id })], axios.post(getAlerts, { userID: user.id }))
      // const SetFavoritesData = await Promise.all([setFavorites(FavoritesData[0].data)], setAlerts(FavoritesData[1].data))
      // const results = await axios.post(url, { userID: user.id })

      const Favorites = await axios.post(getFavorites, { userID: user.id })
      const Alerts = await axios.post(getAlerts, { userID: user.id })
      Promise.all([setFavorites(Favorites.data), setAlerts(Alerts.data)])

      // We may have some async issue here
      if (favorites) {
        setLoading(false)
        setError(false)
      }
    } catch (e) {
      console.error(e)
      setError(error)
    }
    // Passing the length of the array, instead of the array itself, this prevents infinite re-renders
  }, [favorites.length, alerts.length])

  console.log('here are your favorites', favorites)
  console.log('here are your alerts', alerts)

  return (
    <>
      {error && <div><h1>{error}</h1></div>}
      {loading ? (<Spinner><CircularProgress /></Spinner>) : (null)}
      <h1>Favorites</h1>
      {!favorites && <div>To access your favorites, please log-in!</div>}
      {favorites.length > 0 && !loading ? (<FullGameCard favorites={favorites} setFavorites={setFavorites} alerts={alerts} setAlerts={setAlerts} />) : (<div>You have no favorites currently</div>)}
      <h1>Alerts</h1>
      {alerts && !loading && <Alerts alerts={alerts} setAlerts={setAlerts} />}
    </>

  )
}

export default FavoritesPage
