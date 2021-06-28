import { useRouter } from 'next/router'
import React, { useContext, useState } from 'react'
import UserContext from '../organisms/UserContext'
import { useSnackbar } from 'notistack'
import Cookies from 'js-cookie'
import styled from 'styled-components'
import Hamburger from '../atoms/Hamburger'
import Close from '../atoms/CloseMenu'
import Logo from '../atoms/Logo'
import axios from '../../utility/axios'

const NavBarPlacement = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: row;
  height: ${props => props.open ? '100vh' : 'auto'};
  width: ${props => props.open ? '100%' : 'auto'};
  // background-color: ${props => props.open ? 'red' : 'orange'}

`
const Nav = styled.ul`
  width: 100%;
  padding-top: 1em;
  display: ${props => props.open ? 'flex' : 'none'};
  flex-direction: column;
  align-items: center;
  @media(min-width: 801px){
    display: flex;
    flex-direction: row;
  }

`
const NavItem = styled.li`
  cursor: pointer;
  padding: .8em 0;
  padding-right: 1em;
  margin: 0 auto;
  width: 80%;
  font-size:1.8em;
  text-align: center;
  text-shadow: 0 2px 4px rgba(0,0,0,0.15);
  @media(min-width: 801px){
    margin-right:1.4em;
    float:left;
    font-size:1.2em;
    width: auto;
  }
`
const Savings = styled.div`
  margin-left: 0.9em;
  // float:left;
  font-size: 1.2em;
`

const LogoutBtn = styled.button`
  border-radius: 8px;
  background-color: violet;
  min-height: 2.5em;
  width: 60px;
`

const IntroWrapper = styled.div`
  display: ${props => props.open ? 'none' : 'flex'};
  width: ${props => props.open ? 'auto' : '100%'};
  flex-direction: row;
  align-items: center;
  padding-left: 1em;
  `

const HamburgerWrapper = styled.div`
  margin: 1em 0em 0em 0.5em;
  @media(min-width: 801px) {
      display: none;
  }
`

const Navbar = () => {
  const { user, setUser } = useContext(UserContext)
  const [mobileOpen, setMobileOpen] = useState(false)
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()

  const PageNavigation = (props) => {
    setMobileOpen(false)
    router.push(props)
  }

  const Logout = async () => {
    Cookies.remove('jwt')
    Cookies.remove('refresh')
    setUser(null)
    // const res = await axios.post('http://localhost:8080/Logout', user)
    // console.log(res)

    const message = 'You have been logged out! Thanks for visiting!'
    enqueueSnackbar(message, {
      variant: 'info'
    })
    router.push('/')
  }

  return (
    <NavBarPlacement open={mobileOpen}>
      {mobileOpen === false && <HamburgerWrapper onClick={() => { setMobileOpen(!mobileOpen) }}><Hamburger /></HamburgerWrapper>}
      {mobileOpen && <HamburgerWrapper onClick={() => { setMobileOpen(!mobileOpen) }}><Close /> </HamburgerWrapper>}
      <IntroWrapper open={mobileOpen}>
        {(mobileOpen === false) && <Logo style={{ paddingTop: '10em' }} />}
        {user && (mobileOpen === false) &&
          <Savings>
            {user.username} Savings
            <br />
            ${user.savings}!
            <br />
          </Savings>}
      </IntroWrapper>

      <Nav open={mobileOpen}>

        <NavItem href='/' onClick={() => { PageNavigation('/') }}>Home</NavItem>
        <NavItem href='/dashboard' onClick={() => { PageNavigation('/dashboard') }}>Dashboard</NavItem>
        <NavItem href='/search' onClick={() => { PageNavigation('/search') }}>Search</NavItem>
        {user && <NavItem href='/favorites' onClick={() => { PageNavigation('/favorites') }}>Favorites</NavItem>}
        {user && <NavItem><LogoutBtn onClick={() => { Logout() }}>Logout</LogoutBtn></NavItem>}
      </Nav>
    </NavBarPlacement>
  )
}

export default Navbar
