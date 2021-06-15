import { useState, useContext } from 'react'
import { UserContext } from '../components/organisms/UserContext'
import { Slider } from '@material-ui/core'
import Select from 'react-select'
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

const options = [
  { value: 1, label: 'price' },
  { value: 2, label: 'title' },
  { value: 3, label: 'savings' },
  { value: 4, label: 'deal rating' },
  { value: 5, label: 'store' }
]

const Search = () => {
  const [searchTitle, setSearchTitle] = useState('')
  const [priceRange, setPriceRange] = useState([0, 30])
  const [type, setType] = useState({ value: 1, label: 'price' })
  console.log(type)
  console.log(options)

  const updatePrice = (e, price) => {
    setPriceRange(price)
  }

  const updateType = (e, option) => {
    setType(option)
    console.log(type)
  }

  const showMePrice = () => {
    console.log('What youre searching for', searchTitle, priceRange, type)
  }

  return (
    <Container>
      <h1>Search Page</h1>
      <SearchControllersContainer>
        <div style={{ width: '335px', margin: '30px' }}>
          <input
            value={searchTitle}
            onChange={(e) => { setSearchTitle(e.target.value) }}
          />
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
          <Select
            options={options}
            value={options.find(obj => obj.value === type)}
            onChange={(e) => { setType(e.value) }}
          />

        </div>
      </SearchControllersContainer>
      <button onClick={showMePrice}>Show me what I'm searching for</button>

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
