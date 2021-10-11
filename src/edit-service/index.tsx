import ServiceForm from '../components/ServiceForm'
import { useLocation } from 'react-router'
import './styles.css'

function EditService() {
  const { state: service }: any = useLocation()
  return (
    <div className='container'>
      <h1>Edit Service</h1>
      <ServiceForm title={service.title} description={service.description   } />
    </div>
  )
}

export default EditService
