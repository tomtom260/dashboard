import React from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import './styles.css'

import { services } from '../Home'

export type DetailsProps = {
  id: number
  title: string
  description: string
}

const handleRemove = (id: number) => {
  console.log(`remove service ${id}`)
}

function Details() {
  let { id: slug_id } = useParams<{ id?: string }>()
  let id = parseInt(slug_id!)
  const { title, description } = services.find(service => service.id === id)!

  return (
    <div className='details__container'>
      <h1 className='details__title'>{title}</h1>
      <p className='details__description'>{description}</p>
      <p className='details__description'>{description}</p>
      <p className='details__description'>{description}</p>
      <p className='details__description'>{description}</p>

      <Link
        to={{
          pathname: `/edit/${id}`,
          state: {
            id,
            title,
            description,
          },
        }}
      >
        Edit
      </Link>
      {/* <button onClick={() => handleEdit(id)} className='details__button'>
        Edit
      </button> */}
      <button onClick={() => handleRemove(id)} className='details__button'>
        Remove
      </button>
    </div>
  )
}

export default Details
