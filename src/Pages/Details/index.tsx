import { useContext } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { removeService } from '../../store/actions/services'
import { UIContext } from '../../utils/UIProvider'
import useService from '../../utils/useService'
import styles from './styles.module.css'
import { FaPencilAlt, FaTimes } from 'react-icons/fa'

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

  const {
    id,
    createdAt,
    description,
    title,
    addedBy,
    lastModifiedAt,
    lastModifiedBy,
  } = serviceDetails

  return (
    <div className='container'>
      {loading ? (
        <div>loading</div>
      ) : (
        <div className={`card ${styles.details__card}`}>
          <h1 className={styles.details__title}>{title}</h1>
          <p className='details__description'>{description}</p>
          {/* <p className='details__description'>{description}</p>
        <p className='details__description'>{description}</p>
        <p className='details__description'>{description}</p> */}
          <p> added by: {addedBy} </p>
          <p>date created:{new Date(createdAt).toLocaleString()}</p>
          {lastModifiedBy && <p> last modified by: {lastModifiedBy} </p>}
          {lastModifiedAt && (
            <p>modified at:{new Date(lastModifiedAt).toLocaleString()}</p>
          )}
          <div className={styles.card__buttons}>
            <Link
              to={{
                pathname: `/edit/${id}`,
              }}
            >
              <FaPencilAlt />
            </Link>
            <button
              onClick={() => handleRemove(id)}
              className={`button--text  ${styles.details__del_icon}`}
            >
              <FaTimes />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Details
