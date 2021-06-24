import { useState, useContext } from 'react'
import { UserContext } from '../organisms/UserContext'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
// import axios from 'axios'
import styled from 'styled-components'
import axios from '../../utility/axios'
// import { Whirly } from 'css-spinners-react'
import CircularProgress from '@material-ui/core/CircularProgress'

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
const Title = styled.div`
`

const HeaderText = styled.div`
  font-size: 2em;
  font-weight: 700;
  text-align: center;
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

const Login = () => {
  const { user, setUser } = useContext(UserContext)
  const [loadinguser, setLoadingUser] = useState(false)
  const [error, setError] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()

  const LoginUser = async (e) => {
    console.log('hello?')
    try {
      e.preventDefault()
      setLoadingUser(true)
      const LoginObj = {
        email: email,
        password: password
      }
      console.log('halp')
      const request = await axios.post('http://localhost:8080/login', LoginObj)
      console.log(request)
      // if (request.status === 200) {
      const message = 'You have been logged in'
      enqueueSnackbar(message, {
        variant: 'success'
      })
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
      // } else {
      //   const message = 'There was an issue with your login, please try again'
      //   enqueueSnackbar(message, {
      //     variant: 'error'
      //   })
      // }
    } catch (e) {
      console.log(e)
      if (e.status === 404) {
        setError(e)
        const message = 'User not found'
        enqueueSnackbar(message, {
          variant: 'error'
        })
      }
    }
  }

  return (
    <Container>
      <HeaderText>Already a user?</HeaderText>
      {error}
      {setLoadingUser ? (null) : (<Spinner><CircularProgress />Logging in</Spinner>)}

      <form>
        <Label>Email</Label>
        <Input
          value={email}
          onChange={(e) => { setEmail(e.target.value) }}
          placeholder='Email'
        />
        <Label>Password</Label>
        <Input
          value={password}
          onChange={(e) => { setPassword(e.target.value) }}
          placeholder='Password'
          type='password'
        />
        <Button onClick={LoginUser}>Login</Button>
      </form>
    </Container>
  )
}

export default Login
