import { useState, useContext } from 'react'
import UserContext from '../components/organisms/UserContext'
import Head from 'next/head'
import styled from 'styled-components'
import Login from '../components/organisms/Login'
import Register from '../components/organisms/Register'
import CircularProgress from '@material-ui/core/CircularProgress'

const Spinner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const LoginRegisterWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2em;
  @media (min-width: 769px) { 
    height: ${props => props.user ? '75vh' : 'auto'};
  }
`
const Greeting = styled.h1`
  text-align: center;
  font-size: 2em;
`

const IntroText = styled.p`
  display: flex;
  width: 100%;
  font-size: 1.2em;
  line-height: 1.4em;
  text-align: center;
  @media (min-width: 769px) { 
    font-size: 1.8em;
    line-height: 2.0em;
  }
`
export async function getStaticProps (context) {
  return {
    props: {
      SERVER_URL: process.env.SERVER_URL
    }
  }
}

const Home = () => {
  const [loadinguser, setLoadingUser] = useState(false)

  // console.log(props)
  const { user } = useContext(UserContext)
  // I'll render the introtext component alone when removing the login and register
  return (
    <div>
      <Head>
        <title>GameBargins</title>
        <meta name='description' content='Find deals on PC games!' />
        <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
        <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
        <link rel='manifest' href='/site.webmanifest' />
      </Head>

      <TextContainer user={user}>
        {setLoadingUser ? (null) : (<Spinner><CircularProgress />Logging in</Spinner>)}
        <Greeting>Welcome to GameBargins!</Greeting>
        <IntroText>This site is designed to help you find the best deals on PC game titles!
          You can sign up for price alerts, which will automiatcally send an alert to your email when
          a price hits your desired price.
        </IntroText>
        <IntroText>We recommend you register to use all of the site's features, however, you may proceed as a guest! This site is powered by the Cheapshark API.
        </IntroText>
      </TextContainer>

      {!user ? (<LoginRegisterWrapper><Login setLoadingUser={setLoadingUser} /> <Register setLoadingUser={setLoadingUser} /></LoginRegisterWrapper>) : null}

    </div>
  )
}

export default Home
