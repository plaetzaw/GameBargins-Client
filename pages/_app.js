import { useState, useEffect, useMemo } from 'react'
import Navbar from '../components/molecules/Navbar'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import { SnackbarProvider } from 'notistack'
import UserContext from '../components/organisms/UserContext'
import axios from '../utility/axios'

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

  useEffect(() => {
    const findUser = async () => {
      if (!user) {
        const res = await axios.post('https://gamebargins.herokuapp.com/auth')

        // The user does not have a JWT, that's okay
        if (res.status === 201) {
          return
        }
        // Decode the users JWT
        setUser({
          id: res.data.userdata.id,
          username: res.data.userdata.name,
          email: res.data.userdata.email,
          savings: res.data.userdata.moneysaved
        })
      }
    }

    findUser()
  }, [])
  // const uservalue = useMemo(() => ({ user, setUser }), [user, setUser])

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
