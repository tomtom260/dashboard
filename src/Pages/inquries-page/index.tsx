import { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Inquiry from '../../components/inquiry'
import { StoreType } from '../../store'
import { fetchInquiries } from '../../store/actions/inquiries'
import { InquiriesType } from '../../store/reducers/inquiries'
import { UIContext } from '../../utils/UIProvider'
import './styles.css'

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
  const { loading, toggleLoadingState } = useContext(UIContext)

  useEffect(() => {
    toggleLoadingState(true)
    dispatch(fetchInquiries)
    toggleLoadingState(false)
  }, [dispatch, toggleLoadingState])

  const inquiries = useSelector<StoreType, InquiriesType[]>(
    state => state.inquiries
  )

  return (
    <div className='container'>
      <h1 className='container__title'>Inquries</h1>
      {loading ? (
        <div>LOADING...</div>
      ) : (
        inquiries.map(inq => (
          <Inquiry
            key={inq.id}
            fullName={inq.fullName}
            date={inq.date}
            email={inq.email}
            service={inq.service}
            id={inq.id}
          />
        ))
      )}
    </div>
  )
}

export default InquriesPage
