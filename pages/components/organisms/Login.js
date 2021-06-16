import { useState, useContext } from 'react'
import { UserContext } from '../organisms/UserContext'
import { useRouter } from 'next/router'
import axios from 'axios'
import styled from 'styled-components'
// import { Whirly } from 'css-spinners-react'

const Container = styled.div`
display: flex;
`
const Spinner = styled.div`
display: flex;
align-items: center;
justify-content: center;
`

const Login = () => {
  const { user, setUser } = useContext(UserContext)
  const [loadinguser, setLoadingUser] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const LoginUser = async (e) => {
    e.preventDefault()
    setLoadingUser(true)
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
      savings: request.data.user.moneysaved,
      token: request.data.token
    }
    setUser(UserObj)
    router.push('/dashboard')
    setLoadingUser(false)
    console.log(UserObj)
  }
  return (
    <Container>
      <h1>Login</h1>

      {/* {setLoadingUser ? (null) : (<Spinner><Whirly />Logging in</Spinner>)} */}

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

      {/* {user && <button onClick={() => { setUser(null) }}>Logout</button>} */}
    </Container>
  )
}

export default Login
