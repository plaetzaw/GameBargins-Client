import { useState, useContext, useEffect } from 'react'
import { UserContext } from '../components/organisms/UserContext'
import axios from 'axios'
import StoreCard from '../components/molecules/StoreCard'
// import Head from 'next/head

const Dashboard = () => {
  const [stores, setStores] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const { user } = useContext(UserContext)

  useEffect(() => {
    try {
      const url = 'http://localhost:8080/getStores'
      axios.post(url).then(result => {
        setStores(result)
        console.log(result)
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
      {stores && <StoreCard stores={stores} />}
      <br />

    </>
  )
}

export default Dashboard
