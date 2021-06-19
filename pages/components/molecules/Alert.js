import { useContext } from 'react'
import { UserContext } from '../organisms/UserContext'
import styled from 'styled-components'
import axios from 'axios'

const Container = styled.div`
    margin: 1em;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
`

const Card = styled.div`
    border: 2px solid black;
    position: relative;
    text-align: center;
`
const DisplayWrapper = styled.div`
    display: grid;
    grid-template-columns: 35% 20% 17.5% 17.5% 10%;
`

const Title = styled.div`
    font-size: 1.1em;
    text-align: center;
`
const Item = styled.div`
    text-align: center;
`

const Delete = styled.div`
    font-size: 2em;
    color: red;
`

const DeleteAlert = async (game, user, alerts, setAlerts) => {
  console.log(game.id)
  // Delete the alert in the database
  const DeleteAlertObj = {
    id: game.id,
    title: game.title,
    email: user.email,
    gameID: game.gameID,
    desiredprice: game.desiredprice
  }
  console.log(DeleteAlertObj)
  const res = await axios.post('http://localhost:8080/deleteAlert', DeleteAlertObj)
  // We can use the res to set the snackbar later
  console.log(res)
  // Delete the alert from the state
  const newAlerts = alerts.filter(alert => (alert.id !== game.id))
  console.log('Updated alerts', newAlerts)
  setAlerts(newAlerts)
}

const Alert = ({ alerts, setAlerts }) => {
  const { user } = useContext(UserContext)

  // the actual alert

  const Markup = alerts.map((game) => {
    return (
      <Card key={game.id}>
        <DisplayWrapper>
          <Title><b>{game.title}</b></Title>
          <Item>{game.email}</Item>
          <Item>Target Price: ${game.desiredprice}</Item>
          <Item>Price Set At: ${game.setprice}</Item>
          <Delete onClick={() => { DeleteAlert(game, user, alerts, setAlerts) }}>X</Delete>
        </DisplayWrapper>

      </Card>
    )
  })
  return (
    <Container>
      {Markup}
    </Container>
  )
}

export default Alert
