import { useContext, useEffect } from 'react'
import Service from '../../components/service'
import { UIContext } from '../../utils/UIProvider'
import useServices from '../../utils/useServices'
import './index.css'

function Home() {
  useEffect(() => {}, [])
  const { toggleLoadingState } = useContext(UIContext)
  const services = useServices(toggleLoadingState)

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
