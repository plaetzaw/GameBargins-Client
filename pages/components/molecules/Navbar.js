import Link from 'next/link'
import React, { useState, useContext } from 'react'
import { UserContext } from '../organisms/UserContext'

const Navbar = () => {
  return (
    <nav>
      <ul>
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
