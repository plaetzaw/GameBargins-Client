import { useContext } from 'react'
import { UserContext } from './components/organisms/UserContext'
import Head from 'next/head'

import Login from './components/organisms/Login'
import Register from './components/organisms/Register'

const Home = () => {
  const { user } = useContext(UserContext)
  // I'll render the introtext component alone when removing the login and register
  return (
    <div>

      <Head>
        <title>GameBargins</title>
        <meta name='description' content='Find deals on PC games!' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <h1>Home</h1>
      {!user ? (<><Login /> <Register /></>) : null}

    </div>
  )
}

export default Home
