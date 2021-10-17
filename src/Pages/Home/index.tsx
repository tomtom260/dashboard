import { useContext } from 'react'
import Loading from '../../components/Loading'
import Service from '../../components/service'
import { UIContext } from '../../utils/UIProvider'
import useServices from '../../utils/useServices'
import styles from './styles.module.css'
import Footer from '../../components/Footer'

function Home() {
  const { toggleLoadingState } = useContext(UIContext)
  const services = useServices(toggleLoadingState)
  const { loading } = useContext(UIContext)
  return loading ? (
    <Loading />
  ) : (
    <>
      <div className={styles.services__title}>
        <h1>Services</h1>
      </div>
      <div className={`container ${styles.services}`}>
        {services.map(service => (
          <Service
            key={service.id}
            title={service.title}
            id={service.id}
            description={service.description}
            features={service.features}
          />
        ))}
      </div>
    </>
  )
}

export default Home
