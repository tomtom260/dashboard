import { useContext } from 'react'
import { useSelector } from 'react-redux'
import Service from '../../components/service'
import { StoreType } from '../../store'
import { ServiceType } from '../../store/reducers/services'
import { UIContext } from '../../utils/UIProvider'
import './index.css'

function Home() {
  const services = useSelector<StoreType, ServiceType[]>(
    state => state.services
  )

  const { loading } = useContext(UIContext)

  return loading ? (
    <div className='loading-container'>LOADING...</div>
  ) : (
    <div>
      <div className='container'>
        <h1>Services</h1>
        {services.map(service => (
          <Service
            key={service.id}
            title={service.title}
            id={service.id}
            description={service.description}
          />
        ))}
      </div>
    </div>
  )
}

export default Home
