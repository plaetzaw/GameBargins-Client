import { useState, useContext, useEffect } from 'react'
import { UserContext } from '../components/organisms/UserContext'
import axios from 'axios'
import StoreCard from '../components/molecules/StoreCard'
import GamesCard from '../components/molecules/GameDealCards'
// import Head from 'next/head

const Dashboard = () => {
  const [stores, setStores] = useState(null)
  const [deals, setDeals] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [provider, setProvider] = useState(1)
  const { user } = useContext(UserContext)

  console.log(provider)

  useEffect(async () => {
    try {
      console.log(provider)
      const storeURL = 'http://localhost:8080/getStores'
      const dealsURL = 'http://localhost:8080/getDeals'
      const storelist = await axios.post(storeURL)
      const dealslist = await axios.post(dealsURL, { storeID: provider })
      console.log('here are the stores', storelist)
      console.log('current deals', provider, dealslist)
      setDeals(dealslist)
      setStores(storelist)
      if (stores && deals) {
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
      {loading && <div><h1>LOADING...</h1></div>}
      <h1>Dashboard Page</h1>
      {stores && <StoreCard stores={stores} provider={provider} setProvider={setProvider} />}
      {stores && !loading && <GamesCard deals={deals} />}
      <br />

    </>
  )
}

export default Dashboard
