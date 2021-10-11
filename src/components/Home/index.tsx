import React from 'react'
import Navigation from '../Navigation'
import Service from '../service'

function Home() {
  return (
    <div>
      {/* <div>Navigation</div> */}
      <Navigation />
      <div className='services'>
        <p>Services</p>
        <Service />
        <Service />
        <Service />
      </div>
      <div>Footer</div>
    </div>
  )
}

export default Home
