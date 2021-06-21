import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext, useState } from 'react'
import { UserContext } from '../organisms/UserContext'
import styled from 'styled-components'
import Hamburger from '../atoms/Hamburger'
import Close from '../atoms/CloseMenu'

const NavBarPlacement = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  height: ${props => props.open ? '100vh' : 'auto'};
  width: ${props => props.open ? '100%' : 'auto'};
  background-color: ${props => props.open ? 'red' : 'orange'}

`
const Nav = styled.ul`
  width: 100%;
  padding-top: 1em;
  display: ${props => props.open ? 'block' : 'none'};
  @media(min-width: 801px){
    display: block;
    margin-top:1.8em;
  }

`
const NavItem = styled.li`
  display: block;

  padding: .6em 0;
  margin: 0 auto;
  width: 80%;
  font-size:1.8em;
  // text-shadow: 0 2px 4px rgba(0,0,0,0.15);
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

// const IntroWrapper = styled.div`
//   display: flex;
//   flex-direction: row;
//   align-items: center;
// `

// const NavWrapper = styled.div`
//   width: 100%;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
// `

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
    router.push(props.href)
  }

  const Logout = () => {
    setUser(null)
    router.push('/')
  }

  return (
    <NavBarPlacement open={mobileOpen}>
      {mobileOpen === false && <HamburgerWrapper onClick={() => { setMobileOpen(!mobileOpen) }}><Hamburger /></HamburgerWrapper>}
      {mobileOpen && <HamburgerWrapper onClick={() => { setMobileOpen(!mobileOpen) }}><Close /> </HamburgerWrapper>}
      <Nav open={mobileOpen}>
        {/* <IntroWrapper> */}
        {/* {user && <Welcome><div>Welcome {user.username}!</div></Welcome>} */}
        {/* {user && <Savings><div>Your Savings: ${user.savings}!</div></Savings>} */}
        {/* </IntroWrapper> */}
        {/* <NavWrapper> */}
        <NavItem><Link href='/'>Home</Link></NavItem>
        <NavItem><Link href='/dashboard'>Dashboard</Link></NavItem>
        <NavItem><Link href='/search'>Search</Link></NavItem>
        {user && <NavItem><Link href='/favorites'>Favorites</Link></NavItem>}
        {user && <NavItem><LogoutBtn onClick={() => { Logout() }}>Logout</LogoutBtn></NavItem>}
        {/* </NavWrapper> */}
      </Nav>
    </NavBarPlacement>
  )
}

export default Navbar
