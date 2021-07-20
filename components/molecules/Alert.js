import { useContext } from 'react'
import UserContext from '../organisms/UserContext'
import { useSnackbar } from 'notistack'

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
    // grid-template-columns: 35% 20% 17.5% 17.5% 10%;
    grid-template-columns: 40% 25% 25% 10%;
`

const Title = styled.span`
    font-size: 1.1em;
    text-align: center;
`
const Item = styled.span`
    text-align: center;
`

const Delete = styled.span`
    font-size: 2em;
    color: red;
`

const DeleteAlert = async (game, user, alerts, setAlerts, enqueueSnackbar) => {
  // Delete the alert in the database
  const DeleteAlertObj = {
    id: game.id,
    title: game.title,
    email: user.email,
    gameID: game.gameID,
    desiredprice: game.desiredprice
  }
  const res = await axios.post('https://gamebargins.herokuapp.com/deleteAlert', DeleteAlertObj)
  if (res.status === 200) {
    const message = `${DeleteAlertObj.title} has been removed from your favorites`
    enqueueSnackbar(message, {
      variant: 'warning'
    })
    // Delete the alert from the state
    const newAlerts = alerts.filter(alert => (alert.id !== game.id))
    setAlerts(newAlerts)
  }
}

const Alert = ({ alerts, setAlerts }) => {
  const { user } = useContext(UserContext)
  const { enqueueSnackbar } = useSnackbar()

  // the actual alert

  const Markup = alerts.map((game) => {
    return (
      <Card key={game.id}>
        <DisplayWrapper>
          <Title><b>{game.title}</b></Title>
          {/* <Item>{game.email}</Item> */}
          <Item>Target Price: ${game.desiredprice}</Item>
          <Item>Price Set At: ${game.setprice}</Item>
          <Delete onClick={() => { DeleteAlert(game, user, alerts, setAlerts, enqueueSnackbar) }}>X</Delete>
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
