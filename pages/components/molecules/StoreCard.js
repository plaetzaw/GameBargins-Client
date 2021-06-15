import styled from 'styled-components'
// import Radio from '@material-ui/core/Radio'
// import RadioGroup from '@material-ui/core/RadioGroup'
// import FormControlLabel from '@material-ui/core/FormControlLabel'

const Container = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`
const Card = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1em;
    border: 2px solid;
`
const Title = styled.h3`
    text-align: center;
`
const Logo = styled.img`
    max-width: 150px;
`

const StoreCard = ({ stores, provider, setProvider }) => {
  const NewStore = (store) => {
    setProvider(store)
    console.log(provider)
  }

  const Markup = stores.data.map((store) => {
    return (
      <Card key={store.storeID}>
        <Title>{store.storeName}</Title>
        {/* 'Icon'<img src={`https://www.cheapshark.com/${store.images.icon}`} /> */}
        {/* 'Banner'<img src={`https://www.cheapshark.com/${store.images.banner}`} /> */}
        <Logo src={`https://www.cheapshark.com/${store.images.logo}`} />
        {/* <RadioGroup aria-label='gender' name='gender1' onChange={(e) => { NewStore(store.storeID) }}> */}
        {/* <FormControlLabel value={store.storeID} control={<Radio />} label='Provider' /> */}
        {/* </RadioGroup> */}

        <button onClick={(e) => { NewStore(store.storeID) }}>See Deals</button>
      </Card>
    )
  })

  return (
    <Container>
      {Markup}
    </Container>
  )
}

export default StoreCard
