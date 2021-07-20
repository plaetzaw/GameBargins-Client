import { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'
// import { Whirly } from 'css-spinners-react'
import CircularProgress from '@material-ui/core/CircularProgress'

import Head from 'next/head'

// Atoms
// import UserContext from '../components/organisms/UserContext'

// Molecules
import StoreCard from '../../components/molecules/StoreCard'
import GamesCard from '../../components/molecules/GameDealCards'

const Title = styled.h1`
  text-align: center;
  font-size: 2.1em;
`

const Spinner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const Dashboard = (props) => {
  const [stores, setStores] = useState(null)
  const [deals, setDeals] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [provider, setProvider] = useState(1)
  // const { user } = useContext(UserContext)

  useEffect(async () => {
    try {
      const storeURL = 'https://gamebargins.herokuapp.com/getStores'
      const dealsURL = 'https://gamebargins.herokuapp.com/getDeals'
      const pagedata = await Promise.all([
        axios.post(storeURL),
        axios.post(dealsURL, { storeID: provider })
      ])

      setStores(pagedata[0].data)
      setDeals(pagedata[1].data)
      if (pagedata) {
        setLoading(false)
        setError(false)
      }
    } catch (e) {
      setError(e)
    }
  }, [provider])
  return (
    <>
      <Head>
        <title>GameBargins || Discovery</title>
        <meta name='description' content='Find deals on PC games!' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      {error && <div><h1>{error}</h1></div>}
      {loading ? (<Spinner><CircularProgress /></Spinner>) : (null)}
      <Title>Discovery</Title>
      {stores && !loading && <StoreCard stores={stores} provider={provider} setProvider={setProvider} />}
      {deals && !loading && <GamesCard deals={deals} />}
    </>
  )
}

export default Dashboard
