import { useContext } from 'react'
import Service from '../../components/service'
import { UIContext } from '../../utils/UIProvider'
import useServices from '../../utils/useServices'
import styles from './styles.module.css'

function Home() {
  const { toggleLoadingState } = useContext(UIContext)
  const services = useServices(toggleLoadingState)

  const { loading } = useContext(UIContext)
  return (
    <>
      <div className={styles.services__title}>
        <h1>Services</h1>
      </div>
      <div className={`container ${styles.services}`}>
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
          // <Service
          //   key={services[0].id}
          //   title={services[0].title}
          //   id={services[0].id}
          //   description={services[0].description}
          // />
        )}
      </div>
    </>
  )
}

export default Home
