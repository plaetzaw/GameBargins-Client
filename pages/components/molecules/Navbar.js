import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext, useState } from 'react'
import { UserContext } from '../organisms/UserContext'
import styled from 'styled-components'
import Hamburger from '../atoms/Hamburger'
import Close from '../atoms/CloseMenu'

const NavBarPlacement = styled.div`
  display: flex;
  flex-direction: row;
  height: ${props => props.open ? '100vh' : 'auto'};
  width: ${props => props.open ? '100%' : 'auto'};
  background-color: ${props => props.open ? 'red' : 'orange'}

`
const Nav = styled.ul`
  display: flex;
  flex-wrap: wrap;
  // width: 100%;
  padding: 0;
`
const NavItem = styled.li`
  margin-right: .5em;
  float:left;
  font-size: 1.3em;
  width: auto;
  padding: 0.5em;
  align-items: center;
  // text-shadow: 0 2px 4px rgba(0,0,0,0.15);
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
  display: flex;
  flex-direction: row;
  align-items: center;
`

const NavWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`
const HamburgerWrapper = styled.div`
`

const Navbar = () => {
  const { user, setUser } = useContext(UserContext)
  const [mobileOpen, setMobileOpen] = useState(false)
  const router = useRouter()

  const Logout = () => {
    setUser(null)
    router.push('/')
  }

  return (
    <NavBarPlacement open={mobileOpen}>
      <nav>
        <Nav>
          {mobileOpen === false && <HamburgerWrapper onClick={() => { setMobileOpen(!mobileOpen) }}><Hamburger /></HamburgerWrapper>}
          {mobileOpen && <HamburgerWrapper onClick={() => { setMobileOpen(!mobileOpen) }}><Close /> </HamburgerWrapper>}
          <IntroWrapper>
            {user && <Welcome><div>Welcome {user.username}!</div></Welcome>}
            {user && <Savings><div>Your Savings: ${user.savings}!</div></Savings>}
          </IntroWrapper>
          <NavWrapper>
            <NavItem><Link href='/'>Home</Link></NavItem>
            <NavItem><Link href='/dashboard'>Dashboard</Link></NavItem>
            <NavItem><Link href='/search'>Search</Link></NavItem>
            {user && <NavItem><Link href='/favorites'>Favorites</Link></NavItem>}
            {user && <NavItem><LogoutBtn onClick={() => { Logout() }}>Logout</LogoutBtn></NavItem>}

          </NavWrapper>
        </Nav>
      </nav>
    </NavBarPlacement>
  )
}

export default Navbar
