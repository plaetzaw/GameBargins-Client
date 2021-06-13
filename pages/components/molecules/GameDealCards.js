import { useContext } from 'react'
import { UserContext } from '../organisms/UserContext'
import styled from 'styled-components'
import axios from 'axios'

const Container = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;
`
const Card = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    border: 2px solid;
    padding: 1em;
    max-width: 250px;
    // height: 200px;
`
const Title = styled.h3`
    display: flex;
    text-align: center;
    flex-wrap: wrap;
    max-width: 300px;
`

const Logo = styled.img`
    display: flex;
    max-width: 150px;
    max-height: 100px; 
`
const OpenMetacritic = (metacritic) => {
  window.open(`https://www.metacritic.com${metacritic}`)
}
const OpenDeal = (dealID) => {
  window.open(`https://www.cheapshark.com/redirect?dealID=${dealID}`)
}

const SaveToFavorites = async (game, user) => {
  const GameObj = {
    userID: user.id,
    title: game.title,
    dealID: game.dealID,
    storeID: game.storeID,
    gameID: game.gameID,
    salePrice: game.salePrice,
    normalPrice: game.normalPrice,
    savings: game.savings,
    isOnSale: game.isOnSale,
    metacriticLink: game.metacriticLink,
    metacriticScore: game.metacriticScore,
    steamRatingText: game.steamRatingText,
    steamRatingPercent: game.steamRatingPercent,
    steamRatingCount: game.steamRatingCount,
    steamAppID: game.steamAppID,
    releaseDate: game.releaseDate,
    lastChange: game.lastChange,
    dealRating: game.dealRating,
    thumb: game.thumb
  }
  console.log(GameObj)
  const res = await axios.post('http://localhost:8080/createFavorite', GameObj)
  console.log(res)
}

const GameDealCards = ({ deals }) => {
  const { user } = useContext(UserContext)
  console.log(user)

  console.log(deals)
  const Markup = deals.data.map((game) => {
    return (
      <Card key={game.gameID}>
        <Title>{game.title}</Title>
        <Logo src={game.thumb} />
        <Title>Current Price: ${game.salePrice} down from ${game.normalPrice}</Title>

        <Title>Deal Rating: {game.dealRating}/10.0</Title>
        <Title onClick={() => { OpenDeal(game.dealID) }}>View this deal!</Title>
        <Title onClick={() => { OpenMetacritic(game.metacriticLink) }}>View on MetaCritic</Title>
        <Title onClick={() => { SaveToFavorites(game, user) }}>Save to Favorites</Title>

      </Card>
    )
  })
  return (
    <Container>
      {Markup}
    </Container>
  )
}

export default GameDealCards
