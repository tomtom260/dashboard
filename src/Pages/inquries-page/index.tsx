import { useContext, useState } from 'react'
import { useDispatch, useSelector, useStore } from 'react-redux'
import Inquiry from '../../components/inquiry'
import { StoreType } from '../../store'
import { fetchInquiries } from '../../store/actions/inquiries'
import { InquiriesType } from '../../store/reducers/inquiries'
import { UIContext } from '../../utils/UIProvider'
import { useInView } from 'react-intersection-observer'
import './styles.css'
import { AuthContext } from '../../utils/AuthProvider'

// const inquiries = [
//   {
//     fullName: 'Thomas Mesfin',
//     email: 'thomasmesfin260@gmail.com',
//     service: 'Employee Managment System',
//     date: 0,
//     id: 1,
//   },
//   {
//     fullName: 'Thomas Mesfin',
//     email: 'thomasmesfin260@gmail.com',
//     service: 'Employee Managment System',
//     date: 0,
//     id: 2,
//   },
//   {
//     fullName: 'Thomas Mesfin',
//     email: 'thomasmesfin260@gmail.com',
//     service: 'Employee Managment System',
//     date: 0,
//     id: 3,
//   },
// ]

function InquriesPage() {
  const dispatch = useDispatch()
  // const store = useStore<StoreType>()
  const { loading, toggleLoadingState } = useContext(UIContext)

  const inquiries = useSelector<StoreType, InquiriesType[]>(
    state => state.inquiries
  )
  // const [inquiries, setInquiries] = useState(store.getState().inquiries)

  console.log(inquiries)

  return (
    <div className='container'>
      <h1 className='container__title'>Inquries</h1>
      {loading ? (
        <div>LOADING...</div>
      ) : (
        inquiries.map(inq => {
          return (
            <Inquiry
              seen={inq.seen}
              handledBy={inq.handledBy}
              key={inq.id}
              fullName={inq.fullName}
              date={inq.date}
              email={inq.email}
              service={inq.service}
              id={inq.id}
            />
          )
        })
      )}
    </div>
  )
}

export default InquriesPage
