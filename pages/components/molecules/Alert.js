import { useContext } from 'react'
import { UserContext } from '../organisms/UserContext'
import styled from 'styled-components'
import axios from 'axios'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
`

const Card = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 1em;
    border: 2px solid;
    width: 90%;
`
const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
`
const Column = styled.div`
    display: flex;
    flex-direction: column;
`

const Title = styled.div`
    font-size: 1.5em;
    font-weight: 00;
`
const Item = styled(Title)`
    font-size: 1em;
    font-weight: 100;
`
const Delete = styled.div`
    flex-direction: row;
    font-size: 4em;
    position: absolute;
    top: 45px;
    left: 290px;
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
        <Wrapper>
          <Column>
            <Title>{game.title}</Title>
            <Item>{game.email}</Item>
            <Item>Target Price: {game.desiredprice}</Item>
            <Item>Price Set At: {game.setprice}</Item>
          </Column>
          <Delete onClick={() => { DeleteAlert(game, user, alerts, setAlerts) }}>X</Delete>
        </Wrapper>
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
