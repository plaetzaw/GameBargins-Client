import styled from 'styled-components'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'

const Container = styled.div`
    display: grid;
    grid-template-columns: 50% 50%;
    padding-bottom: 4em;
    @media (min-width: 380px) {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
    {

`
const Card = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1em;
    border: solid;
    max-width: 150px;
    background-color: #C0C0C0;
    // width: 120px;

`
const Title = styled.span`
    text-align: center;
    font-weight: bold;
    font-size: 1.1rem;
    @media (min-width: 769px) {
      font-size: 1.5;
    }
`

const Logo = styled.img`
    max-height: 150px;
    // width: 75px;
    padding: 0.3em 0 0.5em 0;
`

const StoreCard = ({ stores, provider, setProvider }) => {
  const NewStore = (store) => {
    setProvider(store)
  }

  const Markup = stores.map((store) => {
    return (
      <Card key={store.storeID}>
        <Title>{store.storeName}</Title>
        {/* 'Icon'<img src={`https://www.cheapshark.com/${store.images.icon}`} /> */}
        {/* 'Banner'<img src={`https://www.cheapshark.com/${store.images.banner}`} /> */}
        <Logo src={`https://www.cheapshark.com/${store.images.logo}`} />
        <RadioGroup aria-label='store' name='gender1' value={provider} onChange={(e) => { NewStore(store.storeID) }}>
          <FormControlLabel value={store.storeID} control={<Radio />} label='See Deals!' />
        </RadioGroup>
        {/* <button onClick={(e) => { NewStore(store.storeID) }}>See Deals</button> */}
      </Card>
    )
  })

  return (
    <>
      <Container>
        {Markup}
      </Container>
    </>
  )
}

export default StoreCard
