import { useState, useContext } from 'react'
// import { UserContext } from '../components/organisms/UserContext'
import { Slider, Switch } from '@material-ui/core'

import Select from 'react-select'
import styled from 'styled-components'
import axios from 'axios'

// Atoms

// Organisms
import SearchResults from '../components/organisms/SearchResults'

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
  const [searchData, setSearchData] = useState([])
  const [showResults, setShowResults] = useState(false)
  const [searchTitle, setSearchTitle] = useState('')
  const [exactTitle, setExactTitle] = useState(false)
  const [onSale, setOnSale] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 30])
  const [type, setType] = useState({ value: 1, label: 'price' })

  const UpdatePrice = (e, price) => {
    setPriceRange(price)
  }

  const Submit = async () => {
    const SearchObj = {
      gameTitle: searchTitle,
      exactTitle: exactTitle,
      onSale: onSale,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      sort: type.value
    }
    console.log(SearchObj)
    const res = await axios.post('http://localhost:8080/advancedSearch', SearchObj)
    setSearchData(res.data)
    setShowResults(true)
    console.log(searchData)
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
          <Switch
            value={exactTitle}
            onChange={(e) => { setExactTitle(!exactTitle) }}
            color='primary'
            name='excat title'
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
          <Switch
            value={onSale}
            onChange={(e) => { setOnSale(!onSale) }}
            color='secondary'
            name='excat title'
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
          <Slider
            value={priceRange}
            onChange={UpdatePrice}
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
      <button onClick={Submit}>Search</button>

      <SearchResultsContainer>
        {showResults && <SearchResults searchData={searchData} />}
      </SearchResultsContainer>
    </Container>
  )
}

export default Search
