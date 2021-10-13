import { useContext } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { removeService } from '../../store/actions/services'
import { UIContext } from '../../utils/UIProvider'
import useService from '../../utils/useService'
import './styles.css'

function Details() {
  const dispatch = useDispatch()
  const history = useHistory()

  const handleRemove = async (id: string) => {
    await dispatch(removeService({ id }))
    history.push('/')
  }

  const { id: slug_id } = useParams<{ id: string }>()
  const { toggleLoadingState, loading } = useContext(UIContext)

  const serviceDetails = useService(slug_id, toggleLoadingState)

  if (!serviceDetails.title) {
    return (
      <div className='container'>
        <h1>No Service with this id {slug_id} exists</h1>
      </div>
    )
  }

  const { id, date, description, title, addedBy } = serviceDetails

  return loading ? (
    <div>loading</div>
  ) : (
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
        }}
      >
        Edit
      </Link>
      <button onClick={() => handleRemove(id)} className='details__button'>
        Remove
      </button>
    </div>
  )
}

export default Details
