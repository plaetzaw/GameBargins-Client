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
      <AlertCard alerts={alerts} />
    </Container>
  )
}

export default Alerts
