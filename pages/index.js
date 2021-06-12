import { useContext } from 'react'
import { UserContext } from './components/organisms/UserContext'
import Head from 'next/head'

import Login from './components/organisms/Login'
import Register from './components/organisms/Register'

const Home = () => {
  const { user } = useContext(UserContext)

  return (
    <div>

      <Head>
        <title>GameBargins</title>
        <meta name='description' content='Find deals on PC games!' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <h1>Home</h1>
      <Login />
      <br />
      <Register />

    </div>
  )
}

export default Home
