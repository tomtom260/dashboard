import { useContext } from 'react'
import { AuthContext } from '../../utils/AuthProvider'
import styles from './styles.module.css'
import { useInView } from 'react-intersection-observer'
import { toggleInquirySeen } from '../../store/actions/inquiries'
import { useDispatch } from 'react-redux'
import { UIContext } from '../../utils/UIProvider'

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
  })

  const { user } = useContext(AuthContext)
  const { decCountInquiries } = useContext(UIContext)
  const dispatch = useDispatch()

  if (!seen.includes(user?.displayName!)) {
    if (inView) {
      dispatch(toggleInquirySeen(id, seen, user?.displayName!,decCountInquiries))
    }
  }

  return (
    <div
      ref={ref}
      className={
        !seen.includes(user?.displayName!)
          ? `${styles.inquiries__card_not_seen} card`
          : 'card'
      }
    >
      <h2>{fullName}</h2>
      <h3>{email}</h3>
      <p>{service}</p>
      <p>{new Date(date).toLocaleString()}</p>
    </div>
  )
}

export default Inquiry
