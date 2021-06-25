import { useState, useContext } from 'react'
import { UserContext } from '../organisms/UserContext'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
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
const HeaderText = styled.div`
  font-size: 2em;
  font-weight: 700;
  text-align: center;
`

const Form = styled.form`
  color: grey;
  border: 3px soild grey;
`

const Label = styled.div`
  display: flex;
  font-weight: 500;
  color: violet;
  margin: 1em 1em 1em 1em;
`

const Input = styled.input`
  display: flex;
  width: 75%;
  margin: 0.2em 1em 0.2em 1em;
`
const Button = styled.button`
  display: flex;
  border-radius: 8px;
  font-weight: 700;
  background-color: violet;
  width: 8em;
  height: 3em;
  margin: 2em 1em 2em 1em;
  align-items: center;
  justify-content: center;
`

const Register = () => {
  const { setUser } = useContext(UserContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [loadinguser, setLoadingUser] = useState(false)
  const [error, setError] = useState(null)
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()

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
      if (request.status === 200) {
        const UserObj = {
          id: request.data.user.id,
          username: request.data.user.username,
          email: request.data.user.email,
          savings: request.data.user.savings
        }
        const message = 'Account created and you have been logged in'
        enqueueSnackbar(message, {
          variant: 'success'
        })
        setUser(UserObj)
        router.push('/dashboard')
        setLoadingUser(false)
      } else {
        const message = 'There was an issue with creating your account. Please try again'
        enqueueSnackbar(message, {
          variant: 'error'
        })
      }
    } catch (e) {
      console.error(e)
    }
  }
  return (
    <Container>
      <HeaderText>New to our site?</HeaderText>
      {setLoadingUser ? (null) : (<Spinner><CircularProgress />Logging in</Spinner>)}

      <Form>
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
      </Form>
    </Container>
  )
}

export default Register
