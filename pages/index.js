import { useState, useContext } from 'react'
import { UserContext } from './components/organisms/UserContext'
import Head from 'next/head'

const Home = () => {
  const msg = useContext(UserContext)
  const [user, setUser] = useState(null)

  const Login = async () => {
    return {
      id: 1,
      username: 'MysticPlato',
      email: 'admin@aol.com'
    }
  }

  return (
    <div>

      <Head>
        <title>GameBargins</title>
        <meta name='description' content='Find deals on PC games!' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <h1>Home</h1>
      <div>
        {msg}
        <br />
        <pre>{JSON.stringify(user, null, 2)}</pre>
        <button onClick={async () => {
          const user = await Login()
          setUser(user)
        }}
        >swap
        </button>
      </div>

    </div>
  )
}

export default Home
