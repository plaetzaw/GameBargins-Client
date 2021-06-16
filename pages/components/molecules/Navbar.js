import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import { UserContext } from '../organisms/UserContext'

const Navbar = () => {
  const { user, setUser } = useContext(UserContext)
  const router = useRouter()

  const Logout = () => {
    setUser(null)
    router.push('/')
  }

  return (
    <nav>
      <ul>
        {user && <li><div>Welcome {user.username}!</div></li>}
        {user && <li><div>Current Savings: {user.savings}!</div></li>}
        <li><Link href='/'>Home</Link></li>
        <li><Link href='/dashboard'>Dashboard</Link></li>
        {user && <li><Link href='/favorites'>Favorites</Link></li>}
        <li><Link href='/search'>Search</Link></li>
        <li>{user && <button onClick={() => { Logout() }}>Logout</button>}</li>
      </ul>
    </nav>
  )
}

export default Navbar
