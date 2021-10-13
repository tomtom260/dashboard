import styles from './styles.module.css'

type InquiryProps = {
  id: string
  fullName: string
  email: string
  service: string
  date: number
}

function Inquiry({ fullName, email, service, date, id }: InquiryProps) {
  return (
    <div className='card'>
      <h2>{fullName}</h2>
      <h3>{email}</h3>
      <p>{service}</p>
      <p>{new Date(date).toLocaleString()}</p>
    </div>
  )
}

export default Inquiry
