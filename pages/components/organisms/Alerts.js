import styled from 'styled-components'
import AlertCard from '../molecules/Alert'

const Container = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`

const Alerts = ({ alerts, setAlerts }) => {
  // this will render the alerts
  return (
    <Container>
      {alerts.length > 0 ? (<AlertCard alerts={alerts} setAlerts={setAlerts} />) : (<div>You have no alerts currently</div>)}
    </Container>
  )
}

export default Alerts
