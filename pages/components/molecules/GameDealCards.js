import { useState, useContext } from 'react'
import { UserContext } from '../organisms/UserContext'
import styled from 'styled-components'
import axios from 'axios'

const Container = styled.div`
    display: grid;
    grid-template-columns: 100%;
    justify-content: center;
    align-content: center;
    @media (min-width: 450px) {
      display: grid;
      grid-template-columns: 50% 50%
    }
    @media (min-width: 769px) { 
      display: grid;
      grid-template-columns: 33% 33% 33%;
    }
    @media (min-width: 1280px) { 
      display: grid;
      grid-template-columns: 25% 25% 25% 25%;
    }

`
const Card = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    border: 2px solid;
    padding: 1em;
    margin: 1em;
    // max-width: 250px;
`

const Title = styled.div`
    min-height: 4em;
    display: flex;
    flex-wrap: wrap;
    font-size: 2.6em;
    align-items: center;
    justify-content: center;
    // padding: 0 1em 0 1em;

`
const LogoDisplay = styled.div`
    display: flex;
    width: 50%;
    padding: 1em;
    justify-content: center;
    align-content: center;
    // min-height: 200px;
`

const Logo = styled.img`
    display: flex;
    max-width: 160px;
    max-height: 125px; 
`

const Price = styled.div`
    display: flex;
    width: 50%;
    color: green;
    font-weight: 700;
    justify-content: flex-start;
`

const ListedPrice = styled(Price)`
    color: red;
    font-weight: 100;
    justify-content: flex-end;
`

const Score = styled(Price)`
    width: 100%;
    color: black;
    font-weight: 600;
    font-size: 1.3em;
    justify-content: center;
    padding: 1em;
`

const HeaderWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;
`

const ItemWrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`

const Deal = styled.button`
    display: flex;
    background-color: lightgreen;
    width: 50%;
    font-size: 1.3em;
    font-weight: bold;
    min-height: 2.2em;
    text-align: center;
    border-radius: 8px;
    align-items: center;
    justify-content: center;
`
const Metacritic = styled(Deal)`
    background-color: violet;
`

const Favorite = styled(Deal)`
    background-color: red;
`
const PriceAlert = styled(Deal)`
    background-color: yellow
`

const Widget = styled(Deal)`
    width: 100%;
    background-color: blue;
`

const OpenMetacritic = (metacritic) => {
  window.open(`https://www.metacritic.com${metacritic}`)
}
const OpenDeal = (dealID) => {
  window.open(`https://www.cheapshark.com/redirect?dealID=${dealID}`)
}

const SetPriceAlert = async (game, user, targetPrice, ToggleWidget) => {
  console.log(game)
  const PriceAlertObj = {
    userID: user.id,
    email: user.email,
    gameID: game.gameID,
    price: targetPrice,
    title: game.title,
    setprice: game.salePrice
  }
  console.log(PriceAlertObj)
  const postalert = await axios.post('http://localhost:8080/setAlert', PriceAlertObj)
  console.log(postalert)
  ToggleWidget(game.dealID)
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
  const [widget, setWidget] = useState([])
  const [targetPrice, setTargetPrice] = useState()
  const { user } = useContext(UserContext)

  const ToggleWidget = (id) => {
    console.log(id)
    if (widget.includes(id) === false) {
      setWidget([...widget, id])
      console.log('The open array items are', widget)
    } else {
      // find the position of this integer
      const idposition = widget.indexOf(id)
      setWidget(widget.filter((_, i) => i !== idposition))
      console.log('The open array items are', widget)
    }
  }

  // const dealscore = (score) => {
  //   if (score.dealRating > 9) {
  //     return 'green'
  //   } else if (score.dealRating < 6 > 9) {
  //     return 'yellow'
  //   } else {
  //     return 'red'
  //   }
  // }

  const Markup = deals.map((game) => {
    return (
      <Card key={game.dealID}>
        <HeaderWrapper>
          <Title>{game.title}</Title>
          <LogoDisplay><Logo src={game.thumb} /></LogoDisplay>

        </HeaderWrapper>
        <ItemWrapper>
          <Price>Current Price: ${game.salePrice}</Price>
          <ListedPrice>Listed Price: ${game.normalPrice}</ListedPrice>
          <Score>Deal Rating: {game.dealRating}/10.0</Score>
        </ItemWrapper>
        <ItemWrapper>
          <Deal onClick={() => { OpenDeal(game.dealID) }}>View this deal!</Deal>
          <Metacritic onClick={() => { OpenMetacritic(game.metacriticLink) }}>View on MetaCritic</Metacritic>
          {user && <Favorite onClick={() => { SaveToFavorites(game, user) }}>Save to Favorites</Favorite>}
          {user && <PriceAlert onClick={() => { ToggleWidget(game.dealID) }}>Set Price Alert</PriceAlert>}
          {widget.includes(game.dealID) && <Widget><input value={targetPrice} onChange={(e) => { setTargetPrice(e.target.value) }} placeholder={game.salePrice} /><button onClick={() => { SetPriceAlert(game, user, targetPrice, ToggleWidget) }}>Confirm</button><button onClick={() => { ToggleWidget(game.dealID) }}>Clear</button></Widget>}
        </ItemWrapper>

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
