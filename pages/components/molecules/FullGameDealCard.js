import { useContext } from 'react'
import { UserContext } from '../organisms/UserContext'
import styled from 'styled-components'
import axios from 'axios'

const Container = styled.div`
    display: grid;
    grid-template-columns: 100%;
`

const Card = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    border: 2px solid;
    // background-color: ${props => props.isOnSale ? 'green' : 'yellow'}
    background-color: ${props => props.isOnSale ? '#FF6464' : '#ffffff'};

    // width: 150px;
    // height: 75px;
`
const Logo = styled.img`
    display: flex;
    max-width: 150px;
    max-height: 100px; 
`

const CardItem = styled.div`
    display: flex;
`

const DeleteFavorite = async (id, favorites, setFavorites) => {
  console.log(id)
  // Delete the favorite in the database
  const res = await axios.post('http://localhost:8080/deleteFavorite', { id: id })
  // We'll use the res to trigger a snackbar later
  console.log(res)
  // Delete the favorite from the state
  const newFavorites = favorites.filter(favorite => (favorite.id !== id))
  console.log('Updated favorites', newFavorites)
  setFavorites(newFavorites)
}

const IBoughtIt = async (game, user, setUser, favorites, setFavorites) => {
  console.log(user)
  // Computes the actual savings, the API provided one seems to have issues
  const savings = game.normalPrice - game.salePrice
  // Updates the Global state for savings
  setUser(user => {
    return Object.assign({}, user, { savings: (user.savings + savings) })
  })
  const UserObj = {
    email: user.email,
    savings: savings
  }
  // Updates the database value for savings
  const updateSavings = await axios.post('http://localhost:8080/updateSavings', UserObj)
  console.log(updateSavings)
  // Removes the item from the favorites since the user has bought the game
  DeleteFavorite(game.id, favorites, setFavorites)
}

const FullGameCard = ({ favorites, setFavorites }) => {
  const { user, setUser } = useContext(UserContext)

  const Markup = favorites.map((game) => {
    console.log(game.isOnSale)

    return (
      <Card key={game.id}>
        <CardItem>{game.title}</CardItem>
        <Logo src={game.thumb} />
        {(game.isOnSale) === true ? (<CardItem isOnSale={game.isOnSale}>This title is currently on sale!</CardItem>) : (<CardItem>This title isn't currently on sale</CardItem>)}
        <CardItem>Current Price {game.salePrice} Normal Price: {game.normalPrice}</CardItem>
        <CardItem> CheapShark Rating: {game.dealRating} / 10</CardItem>
        {(game.metacriticLink !== null) && <CardItem> Metacritic Score {game.metacriticScore} / 100</CardItem>}
        {(game.metacriticLink !== null) && <CardItem>View on MetaCritic {game.metacriticLink}</CardItem>}
        {(game.steamCheckerBool === true) && <CardItem>Steam Rating of {game.steamRatingPercent} and {game.steamRatingText} reviews based on {game.steamRatingCount} reviews</CardItem>}
        <button onClick={() => { DeleteFavorite(game.id, favorites, setFavorites) }}>Remove from Favorites</button>
        <button onClick={() => { IBoughtIt(game, user, setUser, favorites, setFavorites) }}>I bought it</button>
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
