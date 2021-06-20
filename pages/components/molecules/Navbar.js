import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext, useState } from 'react'
import { UserContext } from '../organisms/UserContext'
import styled from 'styled-components'
// import Hamburger from '../atoms/Hamburger'
// import Close from '../atoms/CloseMenu'

const IntroWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

const Welcome = styled.div`
  display: flex;
  margin-right: .5em;
  float:left;
  font-size: 1.2em;
  width: auto;
`

const Savings = styled(Welcome)`
`
const LogoutBtn = styled.button`
  border-radius: 8px;
  background-color: violet;
  min-height: 2em;
`

const NavBarPlacement = styled.div`
  display: flex;
  flex-direction: row;
`

const Nav = styled.ul`
  width: 100%;
  padding: 0;
`
const NavItem = styled.li`
  margin-right: .5em;
  float:left;
  font-size: 1.2em;
  width: auto;
  padding: 0.5em;
  text-shadow: 0 2px 4px rgba(0,0,0,0.15);

`

const NavWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  // justify-content: flex-end;
`

const Navbar = () => {
  const { user, setUser } = useContext(UserContext)
  // const [mobileOpen, setMobileOpen] = useState(false)
  const router = useRouter()

  const Logout = () => {
    setUser(null)
    router.push('/')
  }

  return (
    <NavBarPlacement>
      <nav>
        <Nav>
          {/* {mobileOpen === false && <HamburgerWrapper onClick={() => { setMobileOpen(!mobileOpen) }}><Hamburger /></HamburgerWrapper>}
          {mobileOpen && <HamburgerWrapper onClick={() => { setMobileOpen(!mobileOpen) }}><Close /> </HamburgerWrapper>} */}
          <IntroWrapper>
            {user && <Welcome><div>Welcome {user.username}!</div></Welcome>}
            {user && <Savings><div>Your Savings: ${user.savings}!</div></Savings>}
            {user && <NavItem><LogoutBtn onClick={() => { Logout() }}>Logout</LogoutBtn></NavItem>}
          </IntroWrapper>
          <NavWrapper>
            <NavItem><Link href='/'>Home</Link></NavItem>
            <NavItem><Link href='/dashboard'>Dashboard</Link></NavItem>
            <NavItem><Link href='/search'>Search</Link></NavItem>
            {user && <NavItem><Link href='/favorites'>Favorites</Link></NavItem>}
          </NavWrapper>
        </Nav>
      </nav>
    </NavBarPlacement>
  )
}

export default Navbar
