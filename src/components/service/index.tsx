import { Link } from 'react-router-dom'
import styles from './styles.module.css'
import { ServiceType } from '../../store/reducers/services'

function Service({
  id,
  description,
  title,
}: Pick<ServiceType, 'title' | 'description' | 'id'>) {
  return (
    <div className='card'>
      <p className={'card__title'}>{title}</p>
      <p>{description}</p>
      <Link
        to={`details/${id}`}
        className={`button--primary ${styles.card__button}`}
      >
        Details
      </Link>
    </div>
  )
}

export default Service
