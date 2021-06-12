import { useState, useContext, useEffect } from 'react'
import { UserContext } from '../components/organisms/UserContext'
import axios from 'axios'
import StoreCard from '../components/molecules/StoreCard'
import GamesCard from '../components/molecules/GameDealCards'
// import Head from 'next/head

const Dashboard = () => {
  const [stores, setStores] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [provider, setProvider] = useState(1)
  const { user } = useContext(UserContext)

  console.log(provider)

  useEffect(() => {
    try {
      const url = 'http://localhost:8080/getStores'
      axios.post(url).then(result => {
        console.log(result)
        setStores(result)
        setIsLoading(false)
        setError(false)
      })
    } catch (e) {
      setError(e)
    }
  }, [])
  return (
    <>
      {error && <div><h1>{error}</h1></div>}
      {isLoading && <div><h1>LOADING...</h1></div>}
      <h1>Dashboard Page</h1>
      {stores && <StoreCard stores={stores} provider={provider} setProvider={setProvider} />}
      {stores && <GamesCard provider={provider} />}
      <br />

    </>
  )
}

export default Dashboard
