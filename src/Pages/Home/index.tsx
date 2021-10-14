import { useContext } from 'react'
import Service from '../../components/service'
import { UIContext } from '../../utils/UIProvider'
import useServices from '../../utils/useServices'
import './index.css'

function Home() {
  const { toggleLoadingState } = useContext(UIContext)
  const services = useServices(toggleLoadingState)

  const { loading } = useContext(UIContext)
  return (
    <div className='container'>
      <h1>Services</h1>
      {loading ? (
        <div className='loading-container'>LOADING...</div>
      ) : (
        services.map(service => (
          <Service
            key={service.id}
            title={service.title}
            id={service.id}
            description={service.description}
          />
        ))
      )}
    </div>
  )
}

export default Home
