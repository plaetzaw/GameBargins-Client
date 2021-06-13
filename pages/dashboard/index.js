import { useState, useEffect } from 'react'
// import { UserContext } from '../components/organisms/UserContext'
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
  // const { user } = useContext(UserContext)

  // console.log(provider)

  useEffect(async () => {
    try {
      console.log('current provider', provider)
      const storeURL = 'http://localhost:8080/getStores'
      const dealsURL = 'http://localhost:8080/getDeals'
      const pagedata = await Promise.all([
        axios.post(storeURL),
        axios.post(dealsURL, { storeID: provider })
      ])
      const setdata = await Promise.all([
        setStores(pagedata[0]), setDeals(pagedata[1])
      ])
      // setStores(pagedata[0])
      // setDeals(pagedata[1])
      console.log('here are the stores', pagedata[0])
      console.log('current deals', provider, pagedata[1])
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
      {loading && <div><h1>LOADING...</h1></div>}
      <h1>Dashboard Page</h1>
      {stores && <StoreCard stores={stores} provider={provider} setProvider={setProvider} />}
      {stores && !loading && <GamesCard deals={deals} />}
      <br />

    </>
  )
}

export default Dashboard
