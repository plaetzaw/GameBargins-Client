import { useState, useContext } from 'react'
import { UserContext } from './components/organisms/UserContext'
import axios from 'axios'
import Head from 'next/head'

const Home = () => {
  const msg = useContext(UserContext)
  const [user, setUser] = useState(null)
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)

  const Login = async () => {
    return {
      id: 1,
      username: 'MysticPlato',
      email: 'admin@aol.com'
    }
  }

  const onClick = async (e) => {
    e.preventDefault()
    const LoginObj = {
      email: email,
      password: password
    }
    const request = await axios.post('http://localhost:8080/login', LoginObj)
    console.log(request)
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
      <div>
        <form>
          <input
            value={email}
            onChange={(e) => { setEmail(e.target.value) }}
          />
          <input
            value={password}
            onChange={(e) => { setPassword(e.target.value) }}
          />
          <button onClick={onClick}>Submit</button>
        </form>
      </div>

    </div>
  )
}

export default Home
