import { useContext, useRef } from 'react'
import { AuthContext } from '../../utils/AuthProvider'
import styles from './styles.module.css'
import { useInView } from 'react-intersection-observer'
import {
  toggleInquirySeen,
  updateHandledBy,
} from '../../store/actions/inquiries'
import { useDispatch } from 'react-redux'
import { UIContext } from '../../utils/UIProvider'
import NewReleasesIcon from '@mui/icons-material/NewReleases'

type InquiryProps = {
  id: string
  fullName: string
  email: string
  service: string
  date: number
  handledBy: string
  seen: string[]
}

export const Inquiry = ({
  fullName,
  email,
  service,
  date,
  seen,
  id,
  handledBy,
}: InquiryProps) => {
  const [ref, inView] = useInView({
    threshold: 1,
    triggerOnce: true,
  })

  const { user } = useContext(AuthContext)
  const { decCountInquiries } = useContext(UIContext)
  const dispatch = useDispatch()

  if (!seen.includes(user?.displayName!)) {
    if (inView) {
      dispatch(
        toggleInquirySeen(id, seen, user?.displayName!, decCountInquiries)
      )
    }
  }

  const inqSeen = useRef(seen.includes(user?.displayName!))

  return (
    <div
      ref={ref}
      className={
        !inqSeen.current
          ? `${styles.inquiry} ${styles.inquiry__not_seen}`
          : styles.inquiry
      }
    >
      {!inqSeen.current && (
        <NewReleasesIcon
          style={{
            fontSize: '3rem',
            color: 'rgb(70, 70, 187)',
            alignSelf: 'flex-end',
          }}
        />
      )}
      <h2>{service}</h2>
      <div className={styles.flexbox}>
        <p>Date inquired: {new Date(date).toLocaleDateString()}</p>
        <p>
          handled by:{' '}
          <span
            className={
              handledBy ? styles.handledBy__green : styles.handledBy__red
            }
          >
            {handledBy ? handledBy : 'No One'}
          </span>
        </p>
      </div>
      {!handledBy ? (
        <button
          className={styles.inquiry__contact}
          onClick={() => {
            dispatch(updateHandledBy(id, user?.displayName!))
            window.location.assign(`mailto:${email}`)
          }}
        >
          Contact {fullName}
        </button>
      ) : null}
    </div>
  )
}

export default Inquiry
