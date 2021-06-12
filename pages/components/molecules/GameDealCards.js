import styled from 'styled-components'

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

const GameDealCards = ({ deals }) => {
  console.log(deals)
  const Markup = deals.data.map((game) => {
    return (
      <Card key={game.gameID}>
        <Title>{game.title}</Title>
        <Logo src={game.thumb} />
        <Title>Deal Rating: {game.dealRating}/10.0</Title>
        <Title onClick={() => { OpenDeal(game.dealID) }}>View this deal!</Title>
        <Title onClick={() => { OpenMetacritic(game.metacriticLink) }}>View on MetaCritic</Title>

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
