import { useRouter } from 'next/router'
import React, { useContext, useState } from 'react'
import { UserContext } from '../organisms/UserContext'
import styled from 'styled-components'
import Hamburger from '../atoms/Hamburger'
import Close from '../atoms/CloseMenu'
import Logo from '../atoms/Logo'

const NavBarPlacement = styled.div`
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
const Welcome = styled.div`
  display: flex;
  margin-right: .5em;
  float:left;
  font-size: 1.2em;
  width: auto;
`

const Savings = styled(Welcome)`
  display: flex;
`

const LogoutBtn = styled.button`
  border-radius: 8px;
  background-color: violet;
  min-height: 2.5em;
  width: 60px;
`

const IntroWrapper = styled.div`
display: ${props => props.open ? 'flex' : 'none'};
width: ${props => props.open ? 'auto' : '100%'};
align-items: center;
padding-left: 1em;

  // width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  `

const HamburgerWrapper = styled.div`
  // margin: 2em .8em 0 0;
  // position: absolute;
  @media(min-width: 801px) {
      display: none;
  }
`

const Navbar = () => {
  const { user, setUser } = useContext(UserContext)
  const [mobileOpen, setMobileOpen] = useState(false)
  const router = useRouter()

  const PageNavigation = (props) => {
    setMobileOpen(false)
    router.push(props)
  }

  const Logout = () => {
    setUser(null)
    router.push('/')
  }

  return (
    <NavBarPlacement open={mobileOpen}>
      {mobileOpen === false && <HamburgerWrapper onClick={() => { setMobileOpen(!mobileOpen) }}><Hamburger /></HamburgerWrapper>}
      {mobileOpen && <HamburgerWrapper onClick={() => { setMobileOpen(!mobileOpen) }}><Close /> </HamburgerWrapper>}
      <IntroWrapper open={mobileOpen}>
        {user && (mobileOpen === false) && <Welcome><div>Welcome {user.username}!</div></Welcome>}
        {(mobileOpen === false) && <Logo />}
        {user && (mobileOpen === false) && <Savings><div>Your Savings: ${user.savings}!</div></Savings>}
      </IntroWrapper>

      <Nav open={mobileOpen}>

        {/* <NavWrapper> */}
        <NavItem href='/' onClick={() => { PageNavigation('/') }}>Home</NavItem>
        <NavItem href='/dashboard' onClick={() => { PageNavigation('/dashboard') }}>Dashboard</NavItem>
        <NavItem href='/search' onClick={() => { PageNavigation('/search') }}>Search</NavItem>
        {user && <NavItem href='/favorites' onClick={() => { PageNavigation('/favorites') }}>Favorites</NavItem>}
        {user && <NavItem><LogoutBtn onClick={() => { Logout() }}>Logout</LogoutBtn></NavItem>}
        {/* </NavWrapper> */}
      </Nav>
    </NavBarPlacement>
  )
}

export default Navbar
