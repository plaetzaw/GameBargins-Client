import { useState, useContext } from 'react'
import { UserContext } from '../components/organisms/UserContext'
import { Slider } from '@material-ui/core'
import styled from 'styled-components'
import axios from 'axios'

// Atoms

const Container = styled.div`
`
const SearchControllersContainer = styled.div`
    display: flex;
`

const SearchResultsContainer = styled.div`
    display: grid;
    grid-template-columns: 25% 25% 25% 25%;
`
const marks = [
  {
    value: 0,
    label: '$0'
  },
  {
    value: 5,
    label: '$5'
  },
  {
    value: 10,
    label: '$10'
  },
  {
    value: 15,
    label: '$15'
  },
  {
    value: 20,
    label: '$20'
  },
  {
    value: 25,
    label: '$25'
  },
  {
    value: 30,
    label: '$30'
  },
  {
    value: 35,
    label: '$35'
  },
  {
    value: 40,
    label: '$40'
  },
  {
    value: 45,
    label: '$45'
  },
  {
    value: 50,
    label: '$50'
  },
  {
    value: 55,
    label: '$55'
  },
  {
    value: 60,
    label: '$60'
  }
]

const Search = () => {
  const [priceRange, setPriceRange] = useState([0, 30])

  const updatePrice = (e, price) => {
    setPriceRange(price)
  }

  const showMePrice = () => {
    console.log('your current pricerange is', priceRange)
  }

  return (
    <Container>
      <h1>Search Page</h1>
      {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
      <SearchControllersContainer>
        <div style={{ width: '335px', margin: '30px' }}>
          <Slider
            value={priceRange}
            onChange={updatePrice}
            marks={marks}
            step={5}
            valueLabelDisplay='on'
            min={0}
            max={60}
            aria-labelledby='discrete-slider-always'
          />
        </div>
      </SearchControllersContainer>
      <button onClick={showMePrice}>Show me Price</button>

      <SearchResultsContainer>
        <div>Search Results will go here</div>
        <div>Search Results will go here</div>
        <div>Search Results will go here</div>
        <div>Search Results will go here</div>
        <div>Search Results will go here</div>
        <div>Search Results will go here</div>
        <div>Search Results will go here</div>
      </SearchResultsContainer>
    </Container>
  )
}

export default Search
