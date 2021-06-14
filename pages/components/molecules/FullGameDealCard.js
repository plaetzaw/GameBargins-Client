import styled from 'styled-components'
import axios from 'axios'

const Container = styled.div`
    display: grid;
    grid-template-columns: 25% 25% 25% 25%;
`

const Card = styled.div`
    display: flex;
    flex-direction: column;
    border: 2px solid;
    width: 150px;
    height: 75px;
`

const DeleteFavorite = async (id, favorites, setFavorites) => {
  console.log(id)
  const res = await axios.post('http://localhost:8080/deleteFavorite', { id: id })
  // We'll use the res to trigger a snackbar later
  console.log(res)
  const newFavorites = favorites.filter(favorite => (favorite.id !== id))
  console.log('Updated favorites', newFavorites)
  setFavorites(newFavorites)
}

const FullGameCard = ({ favorites, setFavorites }) => {
  const Markup = favorites.map((game) => {
    return (
      <Card key={game.id}>
        {game.title}
        <button onClick={() => { DeleteFavorite(game.id, favorites, setFavorites) }}>Delete</button>
      </Card>
    )
  })
  return (
    <Container>
      {Markup}
    </Container>
  )
}

export default FullGameCard
