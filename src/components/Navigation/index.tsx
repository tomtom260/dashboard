import React from 'react'
import { Link } from 'react-router-dom'
import './index.css'

function Navigation() {
  return (
    <nav className='navigation'>
      <Link to='/'>Home</Link>
      <Link to='/add-service'>Add Service</Link>
      <Link to='/add-service'>Inquiry</Link>
      <Link to='/add-service'>Logout</Link>
    </nav>
  )
}

export default Navigation