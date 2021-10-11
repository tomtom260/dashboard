import React from 'react'
import Service from '../components/service'
import './index.css'

export const services = [
  {
    id: 1,
    title: 'Employee managment system',
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
  },
  {
    id: 2,
    title: 'Employee managment system',
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
  },
  {
    id: 3,
    title: 'Employee managment system',
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
  },
]

function Home() {
  return (
    <div>
      <div className='services'>
        <h1>Services</h1>
        {services.map(service => (
          <Service
            key={service.id}
            title={service.title}
            id={service.id}
            description={service.description}
          />
        ))}
      </div>
      <div>Footer</div>
    </div>
  )
}

export default Home
