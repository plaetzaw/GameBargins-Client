import { useContext } from 'react'
import { UserContext } from '../components/organisms/UserContext'

const FavoritesPage = () => {
  const { user } = useContext(UserContext)

  return (
    <div>
      <h1>Favorites page</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>

  )
}

export default FavoritesPage
