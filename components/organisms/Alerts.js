import { useContext } from 'react'
import UserContext from '../organisms/UserContext'
import styled from 'styled-components'
import axios from 'axios'
import AlertCard from '../molecules/Alert'

const Container = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    @media (min-width: 769px){
      display: grid;
      // grid-template-columns: 50% 50%;
    }
`
const SendMeAlerts = styled.div`
    display: block;
    text-align: center;
    font-size: 2em;
`
const AlertsBtn = styled.button`
    width: 120px;
    background-color: violet;
    // font-size: 2em;
    // line-height: 2.2em;
`

const SendAlerts = async (user) => {
  const res = await axios.post('https://gamebargins.herokuapp.com/sendAlertsToEmail', { email: user.email })
  console.log(res)
}

const Alerts = ({ alerts, setAlerts }) => {
  const { user } = useContext(UserContext)

  // this will render the alerts
  return (
    <>
      <Container>
        {alerts.length > 0 ? (<AlertCard alerts={alerts} setAlerts={setAlerts} />) : (<div>You have no alerts currently</div>)}
      </Container>
      <SendMeAlerts>
        You can also get an email containing all of your alerts sent to your inbox!
        <br />
        <AlertsBtn onClick={() => { SendAlerts(user) }}>Send me my alerts!</AlertsBtn>
      </SendMeAlerts>
    </>
  )
}

export default Alerts
