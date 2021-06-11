import { useState, useContext } from 'react'
import { UserContext } from '../components/organisms/UserContext'
import Head from 'next/head'

const Dashboard = () => {
  const { value, setValue } = useContext(UserContext)
  const [user, setUser] = useState(null)
  return (
    <>
      <h1>Dashboard Page</h1>
      {value}
      <br />
    </>
  )
}

export default Dashboard
