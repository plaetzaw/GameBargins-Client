import { useState, useContext } from 'react'
import { UserContext } from '../organisms/UserContext'
import { useRouter } from 'next/router'
import CircularProgress from '@material-ui/core/CircularProgress'
import styled from 'styled-components'
import axios from 'axios'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
`

const Spinner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
const Label = styled.div`
  display: flex;
  font-weight: 500;
  color: violet;
  margin: 1em 1em 1em 1em;
`

const Input = styled.input`
  display: flex;
  width: 50%;
  margin: 0.2em 1em 0.2em 1em;
`
const Button = styled.button`
  display: flex;
  border-radius: 8px;
  font-weight: 700;
  background-color: violet;
  width: 80px;
  margin: 1em 1em 0.2em 1em;
`

const Register = () => {
  const { setUser } = useContext(UserContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [loadinguser, setLoadingUser] = useState(false)
  const router = useRouter()

  const RegsiterUser = async (e) => {
    try {
      e.preventDefault()
      setLoadingUser(true)
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
      setLoadingUser(false)
    } catch (e) {
      console.error(e)
    }
  }
  return (
    <Container>
      <h1>New to our site?</h1>
      {setLoadingUser ? (null) : (<Spinner><CircularProgress />Logging in</Spinner>)}

      <form>
        <Label>Email</Label>
        <Input
          value={email}
          onChange={(e) => { setEmail(e.target.value) }}
          placeholder='Email'
        />
        <Label>Username</Label>
        <Input
          value={username}
          onChange={(e) => { setUsername(e.target.value) }}
          placeholder='Username'

        />
        <Label>Password</Label>
        <Input
          value={password}
          onChange={(e) => { setPassword(e.target.value) }}
          placeholder='Password'
          type='password'
        />
        <Button onClick={RegsiterUser}>Register</Button>
      </form>
    </Container>
  )
}

export default Register
