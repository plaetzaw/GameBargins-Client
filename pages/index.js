import { useState, useContext } from 'react'
import { UserContext } from './components/organisms/UserContext'
import axios from 'axios'
import Head from 'next/head'

const Home = () => {
  const { value, setValue } = useContext(UserContext)
  // const { user, setUser } = useContext(UserContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // console.log(user)

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
      email: request.data.user.email
    }
    // setUser(UserObj)
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
      <input
        value={value}
        onChange={(e) => { setValue(e.target.value) }}
      />
      <button onClick={() => { setValue('new value') }}>Change Me</button>
      {value}

    </div>
  )
}

export default Home
