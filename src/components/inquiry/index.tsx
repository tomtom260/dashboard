import { useContext, useRef, memo } from 'react'
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
import { CSSTransition } from 'react-transition-group'
import { motion } from 'framer-motion'

type InquiryProps = {
  id: string
  fullName: string
  email: string
  service: string
  date: number
  handledBy: string
  seen: string[]
  message: string
}

export const Inquiry = ({
  fullName,
  email,
  service,
  date,
  seen,
  id,
  handledBy,
  message,
}: InquiryProps) => {
  const [ref, inView] = useInView({
    threshold: 1,
    triggerOnce: true,
  })

  const { user } = useContext(AuthContext)
  const { decCountInquiries } = useContext(UIContext)
  const dispatch = useDispatch()
  //
  if (!seen.includes(user?.displayName!)) {
    if (inView) {
      dispatch(
        toggleInquirySeen(id, seen, user?.displayName!, decCountInquiries)
      )
    }
  }

  const inqSeen = useRef<boolean[]>([])
  inqSeen.current.push(seen.includes(user?.displayName!))

  const inquiryVariants = {
    initial: !inqSeen.current[0]
      ? {
          boxShadow: '-10px 10px 20px rgba(70, 70, 187, 0.8)',
          border: '2px solid rgb(70, 70, 187)',
        }
      : {
          boxShadow: '-10px 10px 20px rgba(0, 0, 0, 0.2)',
          border: '2px solid #f5f5f5',
        },
    animate: {
      transition: { delay: 2, duration: 2 },
      boxShadow: '-10px 10px 20px rgba(0, 0, 0, 0.2)',
      border: '2px solid #f5f5f5',
    },
  }

  return (
    <motion.div
      variants={inquiryVariants}
      initial='initial'
      animate={inView ? 'initial' : 'animate'}
      ref={ref}
      className={styles.inquiry}
    >
      {!inqSeen.current[0] && (
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
        <p>{message}</p>
        <p>Date inquired: {new Date(date).toLocaleDateString()}</p>
        <p className={styles.handledBy}>
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
    </motion.div>
  )
}

export default memo(Inquiry)
