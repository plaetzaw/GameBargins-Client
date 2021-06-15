import styled from 'styled-components'

const Card = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1em;
    border: 2px solid;
`

const Alert = ({ alerts, setAlert }) => {
  // the actual alert

  const Markup = alerts.map((game) => {
    return (
      <Card key={game.id}>
        Title: {game.title}
        <br />
        User Email: {game.email}
        <br />
        Target Price {game.desiredprice}
        <br />
        Price set at {game.setprice}
      </Card>
    )
  })
  return (
    <>
      {Markup}
    </>
  )
}

export default Alert
