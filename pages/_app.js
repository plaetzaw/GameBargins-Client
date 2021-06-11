import { useState, useMemo } from 'react'
import Navbar from './components/molecules/Navbar'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import { UserContext } from './components/organisms/UserContext'

const GlobalStyle = createGlobalStyle`
body {
  margin: 0;
  padding: 0;
}
`

function MyApp ({ Component, pageProps }) {
  const [value, setValue] = useState('hello from context')
  // const [user, setUser] = useState(null)
  // const uservalue = useMemo(() => ({ user, setUser }), [user, setUser])
  // console.log(user)

  return (
    <>
      <UserContext.Provider value={{ value, setValue }}>
        <Navbar />
        <Component {...pageProps} />
        <GlobalStyle />
      </UserContext.Provider>
    </>
  )
}

export default MyApp
