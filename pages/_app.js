import { useState, useMemo } from 'react'
import Navbar from './components/molecules/Navbar'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import { SnackbarProvider } from 'notistack'
import { UserContext } from './components/organisms/UserContext'

const GlobalStyle = createGlobalStyle`
body {
  margin: 0;
  padding: 0;
}
ul {
  list-style-type: none;
}
a { 
  color: inherit; 
  text-decoration: none !important; 
}

`

function MyApp ({ Component, pageProps }) {
  const [user, setUser] = useState(null)

  // const uservalue = useMemo(() => ({ user, setUser }), [user, setUser])
  // console.log(user)

  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <SnackbarProvider>
          <Navbar />
          <Component {...pageProps} />
          <GlobalStyle />
        </SnackbarProvider>
      </UserContext.Provider>

    </>
  )
}

export default MyApp
