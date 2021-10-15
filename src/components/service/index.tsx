import styles from './styles.module.css'
import { ServiceType } from '../../store/reducers/services'
import { FaPencilAlt, FaTrash } from 'react-icons/fa'
import { Link, useHistory } from 'react-router-dom'
import { removeService } from '../../store/actions/services'
import { useDispatch } from 'react-redux'
import { useInView } from 'react-intersection-observer'

function Service({
  id,
  description,
  title,
}: Pick<ServiceType, 'title' | 'description' | 'id'>) {
  const history = useHistory()
  const dispatch = useDispatch()

  const handleRemove = async (id: string) => {
    await dispatch(removeService({ id }))
    history.push('/')
  }

  const { ref, inView } = useInView({
    threshold: 1,
  })

  return (
    <div
      ref={ref}
      className={
        inView ? `${styles.service} ${styles.service__inview}` : styles.service
      }
    >
      <div className={styles.service__actions}>
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
          <FaTrash />
        </button>
      </div>
      <h1 className={styles.service__title}>{title}</h1>
      <p className={styles.service__description}>{description}</p>
      <h3 className={styles.service__feat_title}>Key Features</h3>
      <div className={styles.service__features}>
        <div
          className={`${styles.service__key_features} ${styles.service__features_left}`}
        >
          <div>Time Managment</div>
          <div>Time Managment</div>
        </div>
        <div
          className={`${styles.service__key_features} ${styles.service__features_right}`}
        >
          <div>Time Managment</div>
          <div>Time Managment</div>
        </div>
      </div>
    </div>
  )
}

export default Service
