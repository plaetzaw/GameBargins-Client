import { useContext } from 'react'
import { UserContext } from '../components/organisms/UserContext'

const Search = () => {
  const { user } = useContext(UserContext)

  return (
    <div>
      <h1>Search Page</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  )
}

export default Search
