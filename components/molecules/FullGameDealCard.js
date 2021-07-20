import { useContext, useState } from 'react'
import UserContext from '../organisms/UserContext'
import { useSnackbar } from 'notistack'
import styled from 'styled-components'
import axios from 'axios'
import Submit from '../atoms/Submit'
import Clear from '../atoms/Clear'

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
    background-color: #e0e0e0;

`

const Title = styled.span`
    display: flex;
    min-height: 4em;
    font-size: 2.6em;
    text-align: center;
    align-items: center;
    justify-content: center;
`
const LogoDisplay = styled.div`
    display: flex;
    width: 50%;
    padding: 1em;
    justify-content: center;
    align-content: center;
`

const Logo = styled.img`
    display: flex;
    max-width: 160px;
    max-height: 125px; 
`

const Price = styled.span`
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

const Score = styled.span`
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

const Sale = styled.span`
    display: flex;
    color: black;
    font-weight: 600;
    font-size: 1.3em;
    justify-content: center;
    align-items: center;
    padding: 0.25em 1em 0.25em 1em;
    min-height: 4em;
`
const NotSale = styled.span`
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
    font-size: 1.3em;
    font-weight: bold;
    text-align: center;
    border-radius: 6px;
    align-items: center;
    justify-content: center;
    min-height: 3em;
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
const BoughtIt = styled(Deal)`
    background-color: orange;
`

const Widget = styled(Deal)`
    background-color: blue;
`
const PriceInput = styled.input`
    width: 60%;
    min-height: 27px;
`

const OpenMetacritic = (metacritic) => {
  window.open(`https://www.metacritic.com${metacritic}`)
}
const OpenDeal = (dealID) => {
  window.open(`https://www.cheapshark.com/redirect?dealID=${dealID}`)
}

const SetPriceAlert = async (game, user, targetPrice, ToggleWidget, alerts, setAlerts, enqueueSnackbar) => {
  const PriceAlertObj = {
    userID: user.id,
    email: user.email,
    gameID: game.gameID,
    price: targetPrice,
    title: game.title,
    setprice: game.salePrice
  }
  console.log(PriceAlertObj)
  const postalert = await axios.post('https://gamebargins.herokuapp.com/setAlert', PriceAlertObj)
  if (postalert.status === 200) {
    const message = `Alert set for ${PriceAlertObj.title} at ${PriceAlertObj.price}!`
    enqueueSnackbar(message, {
      variant: 'success'
    })
    ToggleWidget(game.dealID)
    setAlerts(alerts => [...alerts], PriceAlertObj)
  }
}

const DeleteFavorite = async (id, favorites, setFavorites, enqueueSnackbar) => {
  // Delete the favorite in the database
  const res = await axios.post('https://gamebargins.herokuapp.com/deleteFavorite', { id: id })
  // We'll use the res to trigger a snackbar later
  if (res.status === 200) {
    const message = 'This title has been removed from your favorites'
    enqueueSnackbar(message, {
      variant: 'warning'
    })
    // Delete the favorite from the state
    const newFavorites = favorites.filter(favorite => (favorite.id !== id))
    setFavorites(newFavorites)
  }
}

const IBoughtIt = async (game, user, setUser, favorites, setFavorites, enqueueSnackbar) => {
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
  const message = `You saved $${savings} on ${game.title}. We're glad we could save you money!`
  enqueueSnackbar(message, {
    variant: 'info'
  })
  // Updates the database value for savings
  await axios.post('https://gamebargins.herokuapp.com/updateSavings', UserObj)
  // Removes the item from the favorites since the user has bought the game
  DeleteFavorite(game.id, favorites, setFavorites, enqueueSnackbar)
}

const FullGameCard = ({ favorites, setFavorites, alerts, setAlerts }) => {
  const { user, setUser } = useContext(UserContext)
  const [widget, setWidget] = useState([])
  const [targetPrice, setTargetPrice] = useState()
  const { enqueueSnackbar } = useSnackbar()

  const ToggleWidget = (id) => {
    if (widget.includes(id) === false) {
      setWidget([...widget, id])
    } else {
      // find the position of this integer
      const idposition = widget.indexOf(id)
      setWidget(widget.filter((_, i) => i !== idposition))
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
        <MetaWrapper>{(game.metacriticLink !== null) && <Score> Metacritic Score {game.metacriticScore}/100</Score>}</MetaWrapper>
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
          {user && <Favorite onClick={() => { DeleteFavorite(game.id, favorites, setFavorites, enqueueSnackbar) }}>Delete from favorites</Favorite>}
          {user && <BoughtIt onClick={() => { IBoughtIt(game, user, setUser, favorites, setFavorites, enqueueSnackbar) }}>I bought it</BoughtIt>}
          {user && <PriceAlert onClick={() => { ToggleWidget(game.dealID) }}>Set Price Alert</PriceAlert>}
          {widget.includes(game.dealID) && <Widget><PriceInput value={targetPrice} onChange={(e) => { setTargetPrice(e.target.value) }} placeholder={game.salePrice} /><button onClick={() => { SetPriceAlert(game, user, targetPrice, ToggleWidget, alerts, setAlerts, enqueueSnackbar) }}><Submit /></button><button onClick={() => { ToggleWidget(game.dealID) }}><Clear /></button></Widget>}
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
