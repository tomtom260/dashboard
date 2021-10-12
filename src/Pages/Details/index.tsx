import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { StoreType } from '../../store'
import { removeService } from '../../store/actions/services'
import { ServiceType } from '../../store/reducers/services'
import './styles.css'

// import { services } from '../../Home'

// export type DetailsProps = {
//   id: string
//   title: string
//   description: string
//   addedBy: string
//   dateInserted: number
// }

function Details() {
  const dispatch = useDispatch()
  const handleRemove = (id: string) => {
    dispatch(removeService({ id }))
  }

  const { id: slug_id } = useParams<{ id?: string }>()
  const { id, date, description, title, addedBy } = useSelector<
    StoreType,
    ServiceType
  >(state => state.services.find(service => service.id === slug_id!)!)

  return (
    <div className='details__container'>
      <h1 className='details__title'>{title}</h1>
      <p className='details__description'>{description}</p>
      <p className='details__description'>{description}</p>
      <p className='details__description'>{description}</p>
      <p className='details__description'>{description}</p>
      <p> added by: {addedBy} </p>
      <p>{date}</p>

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
