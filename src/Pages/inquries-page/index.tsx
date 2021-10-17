import { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Inquiry from '../../components/inquiry'
import { StoreType } from '../../store'
import { InquiriesType } from '../../store/reducers/inquiries'
import { UIContext } from '../../utils/UIProvider'
import styles from './styles.module.css'
import NewReleasesIcon from '@mui/icons-material/NewReleases'
import Loading from '../../components/Loading'

function InquriesPage() {
  const dispatch = useDispatch()
  // const store = useStore<StoreType>()
  const { loading, toggleLoadingState } = useContext(UIContext)

  const inquiries = useSelector<StoreType, InquiriesType[]>(
    state => state.inquiries
  )

  return loading ? (
    <Loading />
  ) : (
    <>
      <div className={styles.inquiries__title}>
        <h1>Inquries</h1>
      </div>
      <div className={`container ${styles.inquiries}`}>
        {inquiries.map(inq => {
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
        })}
      </div>
    </>
  )
}

export default InquriesPage
