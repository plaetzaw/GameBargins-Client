import { useState, useContext, useEffect } from 'react'
import { UserContext } from '../components/organisms/UserContext'
import axios from 'axios'
// import Head from 'next/head

const Dashboard = () => {
  const [stores, setStores] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { user } = useContext(UserContext)

  useEffect(() => {
    try {
      const url = 'http://localhost:8080/getStores'
      axios.post(url).then(result => {
        setStores(result)
        console.log(result)
        setLoading(false)
        setError(false)
      })
    } catch (e) {
      setError(e)
    }
  }, [])
  return (
    <>
      <h1>Dashboard Page</h1>
      <br />

    </>
  )
}

export default Dashboard
