import './styles.css'

type InquiryProps = {
  id: number
  fullName: string
  email: string
  service: string
  date: number
}

function Inquiry({ fullName, email, service, date, id }: InquiryProps) {
  return (
    <div className='inquiry'>
      <h2>{fullName}</h2>
      <h3>{email}</h3>
      <p>{service}</p>
      <p>{new Date(date).toLocaleString()}</p>
    </div>
  )
}

export default Inquiry
