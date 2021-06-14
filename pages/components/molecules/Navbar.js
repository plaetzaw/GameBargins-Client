import Link from 'next/link'
import React, { useContext } from 'react'
import { UserContext } from '../organisms/UserContext'

const Navbar = () => {
  const { user, setUser } = useContext(UserContext)

  return (
    <nav>
      <ul>
        <li>
          {user && <pre>Welcome {user.username}!</pre>}
        </li>
        <li>
          <Link href='/'>Home</Link>
        </li>
        <li>
          <Link href='/dashboard'>Dashboard</Link>
        </li>
        <li>
          <Link href='/favorites'>Favorites</Link>
        </li>
        <li>
          <Link href='/search'>Search</Link>
        </li>
        <li>{user && <button onClick={() => { setUser(null) }}>Logout</button>}</li>
      </ul>
    </nav>
  )
}

export default Navbar
