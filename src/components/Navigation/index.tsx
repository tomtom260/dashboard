import React from 'react'
import './index.css'

function Navigation() {
  return (
    <nav className='navigation'>
      <span className='navigation__items'>Home</span>
      <span className='navigation__items'>Add Service</span>
      <span className='navigation__items'>Inquiries</span>
      <span className='navigation__items'>Logout</span>
    </nav>
  )
}

export default Navigation
