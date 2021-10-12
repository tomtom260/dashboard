import { useSelector } from 'react-redux'
import Service from '../../components/service'
import { StoreType } from '../../store'
import { ServiceType } from '../../store/reducers/services'
import './index.css'

function Home() {
  const services = useSelector<StoreType, ServiceType[]>(
    state => state.services
  )

  return (
    <div>
      <div className='services'>
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
      <div>Footer</div>
    </div>
  )
}

export default Home
