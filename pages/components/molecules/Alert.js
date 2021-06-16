// import { useContext } from 'react'
// import { UserContext } from '../organisms/UserContext'
import styled from 'styled-components'
import axios from 'axios'

const Card = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1em;
    border: 2px solid;
`

const DeleteAlert = async (id, alerts, setAlerts) => {
  console.log(id)
  // Delete the alert in the database
  const res = await axios.post('http://localhost:8080/deleteAlert', { id: id })
  // We can use the res to set the snackbar later
  console.log(res)
  // Delete the alert from the state
  const newAlerts = alerts.filter(alert => (alert.id !== id))
  console.log('Updated alerts', newAlerts)
  setAlerts(newAlerts)
}

const Alert = ({ alerts, setAlerts }) => {
  // const { user } = useContext(UserContext)

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
        <button onClick={() => { DeleteAlert(game.id, alerts, setAlerts) }}>Delete Alert</button>
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
