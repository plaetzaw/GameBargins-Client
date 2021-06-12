import { useState, useContext } from 'react'
import { UserContext } from '../organisms/UserContext'
import { useRouter } from 'next/router'
import axios from 'axios'

const Register = () => {
  const { setUser } = useContext(UserContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const router = useRouter()

  const RegsiterUser = async (e) => {
    try {
      e.preventDefault()
      const RegisterObj = {
        email: email,
        username: username,
        password: password
      }
      const request = await axios.post('http://localhost:8080/register', RegisterObj)
      console.log(request)
      const UserObj = {
        id: request.data.newUser.id,
        username: request.data.newUser.username,
        email: request.data.newUser.email
      }
      setUser(UserObj)
      router.push('/dashboard')
    } catch (e) {
      console.error(e)
    }
  }
  return (
    <>
      <h1>Register</h1>
      <form>
        <input
          value={email}
          onChange={(e) => { setEmail(e.target.value) }}
          placeholder='Email'
        />
        <input
          value={username}
          onChange={(e) => { setUsername(e.target.value) }}
          placeholder='Username'

        />
        <input
          value={password}
          onChange={(e) => { setPassword(e.target.value) }}
          placeholder='Password'
        />
        <button onClick={RegsiterUser}>Register</button>
      </form>
    </>
  )
}

export default Register
