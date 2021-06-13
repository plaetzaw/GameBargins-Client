// import styled from 'styled-components'
import axios from 'axios'

const DeleteFavorite = async (id, favorites, setFavorites) => {
  console.log(id)
  const res = await axios.post('http://localhost:8080/deleteFavorite', { id: id })
  console.log(res)
  // I wanted to update the local state instead of pinging the database, but I
  // keep running into data becomes undefined with this method
  const newFavorites = favorites.filter(favorite => (favorite.id !== id))
  console.log('Updated favorites', newFavorites)
//   setFavorites(newFavorites)
}

const FullGameCard = ({ favorites, setFavorites }) => {
  const Markup = favorites.map((game) => {
    return (
      <div key={game.id}>
        {game.title}
        <button onClick={() => { DeleteFavorite(game.id, favorites, setFavorites) }}>Delete</button>
      </div>
    )
  })
  return (
    <>
      {Markup}
    </>
  )
}

export default FullGameCard
