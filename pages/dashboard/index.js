import { useState, useContext, useEffect } from 'react'
import { UserContext } from '../components/organisms/UserContext'
// import Head from 'next/head

const Dashboard = () => {
  const { user } = useContext(UserContext)
  return (
    <>
      <h1>Dashboard Page</h1>
      <br />

      <pre>{JSON.stringify(user, null, 2)}</pre>
    </>
  )
}

export default Dashboard
