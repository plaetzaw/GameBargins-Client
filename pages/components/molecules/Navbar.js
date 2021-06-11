import Link from 'next/link'
import React, { useState, useContext } from 'react'
import { UserContext } from '../organisms/UserContext'

const Navbar = () => {
  const { value, setValue } = useContext(UserContext)

  return (
    <nav>
      <ul>
        <li>
          <div>{value}</div>
          {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
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
      </ul>
    </nav>
  )
}

export default Navbar
