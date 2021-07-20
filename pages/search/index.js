import {
  useState
  // useContext
} from 'react'
// import UserContext from '../components/organisms/UserContext'
import { Slider, Switch } from '@material-ui/core'

import Select from 'react-select'
import styled from 'styled-components'
import axios from 'axios'

// Atoms

// Organisms
import SearchResults from '../../components/organisms/SearchResults'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1em;
`

const Label = styled.div`
  display: flex;
  font-weight: bold;
`

const SearchField = styled.input`
  display: flex;
  width: 100%;
  height: 1.2em;
`

const SearchBtn = styled.button`
    display: flex;
    margin: 2em 0 1em 0;
    background-color: violet;
    font-size: 1.3em;
    font-weight: bold;
    text-align: center;
    border-radius: 6px;
    align-items: center;
    justify-content: center;
    min-height: 3em;
    width: 10em;
`

const SearchControllersContainer = styled.div`
  display: flex;
  flex-direction: column;
`
const SearchBtnWrapper = styled.div`
  display: flex;
  align-items: center;
`

const ToggleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding 1em 0 2.2em 0;
`
const ToggleItem = styled.div`
  flex-direction: column;
  width: 50%;
`

const SearchResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1em;
  // border: 2px solid;
    // display: grid;
    // grid-template-columns: 25% 25% 25% 25%;
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
      sort: type
    }
    const res = await axios.post('https://gamebargins.herokuapp.com/advancedSearch', SearchObj)
    setSearchData(res.data)
    setShowResults(true)
  }

  return (
    <Container>
      <h1>Search Page</h1>
      <SearchControllersContainer>

        <Label>Search Title</Label>
        <SearchField
          value={searchTitle}
          onChange={(e) => { setSearchTitle(e.target.value) }}
        />
        <Label style={{ paddingTop: '1em', paddingBottom: '1em' }}>Search Criteria</Label>
        <Select
          options={options}
          value={options.find(obj => obj.value === type)}
          onChange={(e) => { setType(e.value) }}
        />
        <ToggleWrapper>
          <ToggleItem>
            <Label>Exact title</Label>
            <Switch
              value={exactTitle}
              onChange={(e) => { setExactTitle(!exactTitle) }}
              color='primary'
              name='excat title'
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
          </ToggleItem>
          <ToggleItem>
            <Label>On sale?</Label>
            <Switch
              value={onSale}
              onChange={(e) => { setOnSale(!onSale) }}
              color='secondary'
              name='excat title'
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
          </ToggleItem>
        </ToggleWrapper>
        <Label style={{ paddingBottom: '2.1em', textAlign: 'center' }}>Price Range</Label>
        <Slider
          value={priceRange}
          onChange={UpdatePrice}
          marks={marks}
          step={5}
          valueLabelDisplay='on'
          min={0}
          max={60}
            // orientation='vertical'
          aria-labelledby='discrete-slider-always'
        />
        <SearchBtnWrapper><SearchBtn onClick={Submit}>Search</SearchBtn></SearchBtnWrapper>

      </SearchControllersContainer>

      <SearchResultsContainer>
        {showResults && <SearchResults searchData={searchData} />}
      </SearchResultsContainer>
    </Container>
  )
}

export default Search
