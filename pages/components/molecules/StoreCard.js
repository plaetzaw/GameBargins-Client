import { useState } from 'react'
import styled from 'styled-components'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'

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
    max-width: 150px;

`
const Title = styled.div`
    text-align: center;
    font-weight: bold;
    font-size: 1.1rem;
    @media (min-width: 769px) {
      font-size: 1.5;
    }
`
const Text = styled.div`
    text-align: center;
    @media (min-width: 769px) {
      font-size: 1.2em;
    }
`

const Logo = styled.img`
    max-height: 150px;
    // max-width: 150px;

    padding: 0.3em 0 0.5em 0;
`

const StoreCard = ({ stores, provider, setProvider }) => {
  const [activeStore, setActiveStore] = useState([])

  const NewStore = (store) => {
    setProvider(store)
    ToggleWidget(store)
    console.log(provider)
  }

  const ToggleWidget = (id) => {
    console.log(id)
    if (activeStore.includes(id) === false) {
      setActiveStore([...activeStore, id])
      console.log('The open array items are', activeStore)
    } else {
      // find the position of this integer
      const idposition = activeStore.indexOf(id)
      setActiveStore(activeStore.filter((_, i) => i !== idposition))
      console.log('The open array items are', activeStore)
    }
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
      {/* <h1>Select the store you want to view deals from</h1> */}
      <Container>
        {Markup}
      </Container>
    </>
  )
}

export default StoreCard
