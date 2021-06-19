import { useContext, useState } from 'react'
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

// const Card = styled.div`
//     display: flex;
//     flex-direction: column;
//     flex-wrap: wrap;
//     border: 2px solid;
//     // background-color: ${props => props.isOnSale ? 'green' : 'yellow'}
//     background-color: ${props => props.isOnSale ? '#FF6464' : '#ffffff'};

//     // width: 150px;
//     // height: 75px;
// `

const Card = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    border: 2px solid;
    // padding: 1em;
    // margin: 1em;
`

const Title = styled.div`
    display: flex;
    min-height: 4em;
    font-size: 2.6em;
    text-align: center;
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
    text-align: center;
    align-items: center;
    justify-content: center;
    // justify-content: flex-start;
`

const ListedPrice = styled(Price)`
    color: red;
    font-weight: 100;
    // justify-content: flex-end;
`

const Score = styled.div`
    display: flex;
    color: black;
    font-weight: 600;
    font-size: 1.3em;
    justify-content: center;
    align-items: center;
    width: 50%;
    // padding: 1em;
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
const ChoiceWrapper = styled.div`
    display: grid;
    grid-template-columns: 50% 50%
    `

const Sale = styled.div`
    display: flex;
    color: black;
    font-weight: 600;
    font-size: 1.3em;
    justify-content: center;
    align-items: center;
    padding: 0.25em 1em 0.25em 1em;
    min-height: 4em;
`
const NotSale = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5em 0 0.7em 0;
    min-height: 4.6em;

`

const SaleWrapper = styled.div`
    display: flex;
    flex-direction: row;
`

const MetaWrapper = styled.div`
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
`

const SteamItem = styled.td`
    height: 2.4em;
    text-align: center;
`

const Deal = styled.button`
    display: flex;
    background-color: lightgreen;
    // width: 45%;
    font-size: 1.3em;
    font-weight: bold;
    text-align: center;
    border-radius: 6px;
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

const SetPriceAlert = async (game, user, targetPrice, ToggleWidget, alerts, setAlerts) => {
  console.log(alerts)
  const PriceAlertObj = {
    userID: user.id,
    email: user.email,
    gameID: game.gameID,
    price: targetPrice,
    title: game.title,
    setprice: game.salePrice
  }
  const postalert = await axios.post('http://localhost:8080/setAlert', PriceAlertObj)
  console.log(postalert)
  ToggleWidget(game.dealID)
  setAlerts(alerts => [...alerts], PriceAlertObj)
  console.log(alerts)
}

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

const FullGameCard = ({ favorites, setFavorites, alerts, setAlerts }) => {
  const { user, setUser } = useContext(UserContext)
  const [widget, setWidget] = useState([])
  const [targetPrice, setTargetPrice] = useState()

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

  const Markup = favorites.map((game) => {
    return (
      <Card key={game.id}>
        <HeaderWrapper>
          <Title>{game.title}</Title>
          <LogoDisplay><Logo src={game.thumb} /></LogoDisplay>
        </HeaderWrapper>
        {(game.isOnSale) === true
          ? (<SaleWrapper><Sale isOnSale={game.isOnSale}>This title is currently on sale!</Sale><Sale>Deal Rating: {game.dealRating}/10.0</Sale></SaleWrapper>)
          : (<NotSale>This title isn't currently on sale</NotSale>)}
        <ItemWrapper>
          <Price>Current Price: ${game.salePrice}</Price>
          <ListedPrice>Listed Price: ${game.normalPrice}</ListedPrice>
        </ItemWrapper>
        <MetaWrapper>{(game.metacriticLink !== null) && <Score> Metacritic Score {game.metacriticScore} / 100</Score>}</MetaWrapper>
        {(game.steamCheckerBool === true) &&
          <table>
            <tr>
              <SteamItem><b>Steam Score</b></SteamItem>
              <SteamItem><b>Ratings</b></SteamItem>
              <SteamItem><b>Reviews</b></SteamItem>
            </tr>
            <tr>
              <SteamItem>{game.steamRatingPercent}</SteamItem>
              <SteamItem>{game.steamRatingText} Ratings</SteamItem>
              <SteamItem>{game.steamRatingCount} Reviews</SteamItem>
            </tr>
          </table>}
        <ChoiceWrapper>
          <Deal onClick={() => { OpenDeal(game.dealID) }}>View this deal!</Deal>
          <Metacritic onClick={() => { OpenMetacritic(game.metacriticLink) }}>View on MetaCritic</Metacritic>
          {user && <Favorite onClick={() => { DeleteFavorite(game.id, favorites, setFavorites) }}>Delete from favorites</Favorite>}
          {user && <PriceAlert onClick={() => { ToggleWidget(game.dealID) }}>Set Price Alert</PriceAlert>}
          {widget.includes(game.dealID) && <Widget><input value={targetPrice} onChange={(e) => { setTargetPrice(e.target.value) }} placeholder={game.salePrice} /><button onClick={() => { SetPriceAlert(game, user, targetPrice, ToggleWidget, alerts, setAlerts) }}>Confirm</button><button onClick={() => { ToggleWidget(game.dealID) }}>Clear</button></Widget>}
          <button onClick={() => { IBoughtIt(game, user, setUser, favorites, setFavorites) }}>I bought it</button>
        </ChoiceWrapper>
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
