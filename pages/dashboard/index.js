import {
  useState, useEffect
  // useContext
} from 'react'
import axios from 'axios'
import styled from 'styled-components'
// import { Whirly } from 'css-spinners-react'
import CircularProgress from '@material-ui/core/CircularProgress'

// import Head from 'next/head

// Atoms
// import UserContext from '../components/organisms/UserContext'

// Molecules
import StoreCard from '../components/molecules/StoreCard'
import GamesCard from '../components/molecules/GameDealCards'

const Spinner = styled.div`
display: flex;
align-items: center;
justify-content: center;
`
export async function getServerSideProps (context) {
  const stores = await axios.post('http://localhost:8080/getStores')
  const deals = await axios.post('http://localhost:8080/getDeals', { storeID: 1 })
  // const data = await res.json()
  // console.log(context, 'whats coming in?')
  // console.log(context)
  console.log(stores, deals)
  // if (!data) {
  //   return {
  //     notFound: true
  //   }
  // }

  return {
    props: {
      stores: stores.data,
      deals: deals.data
    } // will be passed to the page component as props
  }
}

const Dashboard = (props) => {
  const [stores, setStores] = useState(null)
  const [deals, setDeals] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [provider, setProvider] = useState(1)
  // const { user } = useContext(UserContext)

  // console.log(provider)

  useEffect(async () => {
    try {
      console.log('current provider', provider)
      const authURL = 'http://localhost:8080/auth'
      const storeURL = 'http://localhost:8080/getStores'
      const dealsURL = 'http://localhost:8080/getDeals'
      const pagedata = await Promise.all([
        axios.post(storeURL),
        axios.post(dealsURL, { storeID: provider }),
        axios.post(authURL, {}, { withCredentials: true })
      ])
      const setdata = await Promise.all([
        setStores(pagedata[0].data), setDeals(pagedata[1].data)
      ])

      // const setdata = await Promise.all([
      //   setStores(props.stores), setDeals(props.deals)
      // ])

      // setStores(pagedata[0])
      // setDeals(pagedata[1])
      // console.log('here are the stores', pagedata[0])
      // console.log('current deals', provider, pagedata[1])
      // if (deals && stores) {
      //   setLoading(false)
      //   setError(false)
      // }
      if (setdata) {
        setLoading(false)
        setError(false)
      }
    } catch (e) {
      setError(e)
    }
  }, [provider])
  return (
    <>
      {error && <div><h1>{error}</h1></div>}
      {loading ? (<Spinner><CircularProgress /></Spinner>) : (null)}
      <h1>Dashboard Page</h1>
      {stores && <StoreCard stores={stores} provider={provider} setProvider={setProvider} />}
      {stores && !loading && <GamesCard deals={deals} />}
    </>
  )
}

export default Dashboard
