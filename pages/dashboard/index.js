import { useState, useContext } from 'react'
import { UserContext } from '../components/organisms/UserContext'
import Head from 'next/head'

const Dashboard = () => {
  const msg = useContext(UserContext)
  const [user, setUser] = useState(null)
  return (
    <>
      <h1>Dashboard Page</h1>
      {msg}
      <br />
      {/* {user} */}
    </>
  )
}

export default Dashboard
