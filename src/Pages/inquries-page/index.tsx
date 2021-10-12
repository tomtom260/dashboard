import Inquiry from '../../components/inquiry'
import './styles.css'

const inquiries = [
  {
    fullName: 'Thomas Mesfin',
    email: 'thomasmesfin260@gmail.com',
    service: 'Employee Managment System', 
    date: 0,
    id: 1,
  },
  {
    fullName: 'Thomas Mesfin',
    email: 'thomasmesfin260@gmail.com',
    service: 'Employee Managment System',
    date: 0,
    id: 2,
  },
  {
    fullName: 'Thomas Mesfin',
    email: 'thomasmesfin260@gmail.com',
    service: 'Employee Managment System',
    date: 0,
    id: 3,
  },
]

function InquriesPage() {
  return (
    <div className='container'>
      <h1 className='container__title'>Inquries</h1>
      {inquiries.map(inq => (
        <Inquiry
          key={inq.id}
          fullName={inq.fullName}
          date={inq.date}
          email={inq.email}
          service={inq.service}
          id={inq.id}
        />
      ))}
    </div>
  )
}

export default InquriesPage
