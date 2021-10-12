import { Link } from 'react-router-dom'
import './index.css'
import { DetailsProps } from '../../Pages/edit-service/Details'

function Service({
  id,
  description,
  title,
}: Pick<DetailsProps, 'title' | 'description' | 'id'>) {
  return (
    <div className='card'>
      <p className='card__title'>{title}</p>
      <p className='card__description'>{description}</p>
      <Link to={`details/${id}`} className='card__button'>
        Details
      </Link>
    </div>
  )
}

export default Service
