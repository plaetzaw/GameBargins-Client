import { useState, useContext } from 'react'
import { UserContext } from '../components/organisms/UserContext'
import { Slider } from '@material-ui/core'
import styled from 'styled-components'
import axios from 'axios'

// Atoms
import marks from '../components/atoms/marks'

const Container = styled.div`
`
const SearchControllersContainer = styled.div`
    display: flex;
`

const SearchResultsContainer = styled.div`
    display: grid;
    grid-template-columns: 25% 25% 25% 25%;
`

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
        controllers
        <Slider
          value={priceRange}
          onChange={updatePrice}
          marks={marks}
          step={5}
          valueLabelDisplay='on'
          min={0}
          max={100}
        />
        <button onClick={showMePrice}>Show me Price</button>
      </SearchControllersContainer>
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
