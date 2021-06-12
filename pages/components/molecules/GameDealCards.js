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
    border: 2px solid;
    padding: 1em;
    width: 300px;
    height: 300px;
`
const Title = styled.h3`
    text-align: center;
`

const Logo = styled.img`
    display: flex;
    max-width: 100px;
    min-height: 50px; 

`

const GameDealCards = ({ deals }) => {
  console.log(deals)
  const Markup = deals.data.map((game) => {
    return (
      <Card key={game.gameID}>
        <Title>{game.title}</Title>
        <Logo src={game.thumb} />
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
