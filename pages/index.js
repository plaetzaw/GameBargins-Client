import { useContext } from 'react'
import UserContext from './components/organisms/UserContext'
import Head from 'next/head'
import styled from 'styled-components'
import Login from './components/organisms/Login'
import Register from './components/organisms/Register'

const LoginRegisterWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2em;
`
const IntroText = styled.div`
  display: flex;
  width: 100%;
  font-size: 1.1em;
  padding: 0.5em 0 0.5em 0;
  text-align: center;
`

const Home = () => {
  const { user } = useContext(UserContext)
  // I'll render the introtext component alone when removing the login and register
  return (
    <div>

      <Head>
        <title>GameBargins</title>
        <meta name='description' content='Find deals on PC games!' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <TextContainer>
        <IntroText>Welcome to GameBargins. This site is designed to help you find the best deals on PC game titles!</IntroText>
        <IntroText>This site is powered by the Cheapshark API.</IntroText>
        <IntroText>We recommend you register to use all of the site's features, however, you may proceed as a guest!</IntroText>
        {/* <IntroText>To date, we've saved users DB.TotalMoneySaved!</IntroText> */}
      </TextContainer>

      {!user ? (<LoginRegisterWrapper><Login /> <Register /></LoginRegisterWrapper>) : null}

    </div>
  )
}

export default Home
