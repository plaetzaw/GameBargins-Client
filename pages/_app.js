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
  const [user, setUser] = useState(null)
  const value = useMemo(() => ([user, setUser]), [user, setUser])

  return (
    <>
      <UserContext.Provider value={value}>
        <Navbar />
        <Component {...pageProps} />
        <GlobalStyle />
      </UserContext.Provider>
    </>
  )
}

export default MyApp
