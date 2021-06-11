import { useState, useContext, useEffect } from 'react'
import { UserContext } from './components/organisms/UserContext'
import axios from 'axios'
import Head from 'next/head'

const Home = () => {
  const { user, setUser } = useContext(UserContext)
  // const { user, setUser } = useContext(UserContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const Login = async () => {
    return {
      id: 1,
      username: 'MysticPlato',
      email: 'admin@aol.com'
    }
  }

  const LoginUser = async (e) => {
    e.preventDefault()
    const LoginObj = {
      email: email,
      password: password
    }
    const request = await axios.post('http://localhost:8080/login', LoginObj)
    console.log(request)
    const UserObj = {
      id: request.data.user.id,
      username: request.data.user.name,
      email: request.data.user.email,
      token: request.data.token
    }
    setUser(UserObj)
    console.log(UserObj)
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
        <pre>{JSON.stringify(user, null, 2)}</pre>
        <form>
          <input
            value={email}
            onChange={(e) => { setEmail(e.target.value) }}
          />
          <input
            value={password}
            onChange={(e) => { setPassword(e.target.value) }}
          />
          <button onClick={LoginUser}>Submit</button>
        </form>
      </div>
      <br />
      <br />
      <br />
      <button onClick={async () => {
        const user = await Login()
        setUser(user)
      }}
      >Manual Login
      </button>
      <br />
      <br />
      <br />
      {user && <button onClick={() => { setUser(null) }}>Logout</button>}

    </div>
  )
}

export default Home
