import React from 'react'
import Service from '../components/service'
import './index.css'

function Home() {
  return (
    <div>
      <div className='services'>
        <h1>Services</h1>
        <Service />
        <Service />
        <Service />
      </div>
      <div>Footer</div>
    </div>
  )
}

export default Home
