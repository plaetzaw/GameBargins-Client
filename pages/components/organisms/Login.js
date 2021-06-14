import { useState, useContext } from 'react'
import { UserContext } from '../organisms/UserContext'
import { useRouter } from 'next/router'
import axios from 'axios'

const Login = () => {
  const { user, setUser } = useContext(UserContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

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
    router.push('/dashboard')
  }
  return (
    <>
      <h1>Login</h1>
      <form>
        <input
          value={email}
          onChange={(e) => { setEmail(e.target.value) }}
          placeholder='Email'

        />
        <input
          value={password}
          onChange={(e) => { setPassword(e.target.value) }}
          placeholder='Password'
        />
        <button onClick={LoginUser}>Login</button>
      </form>

      {user && <button onClick={() => { setUser(null) }}>Logout</button>}
    </>
  )
}

export default Login
