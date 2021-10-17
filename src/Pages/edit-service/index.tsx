import ServiceForm from '../../components/ServiceForm'
import { useParams } from 'react-router'
import './styles.css'
import { useContext } from 'react'
import { UIContext } from '../../utils/UIProvider'
import useService from '../../utils/useService'
import useServices from '../../utils/useServices'
import Loading from '../../components/Loading'

function EditService() {
  const { id } = useParams<{ id: string }>()

  const { loading, toggleLoadingState } = useContext(UIContext)
  useServices(toggleLoadingState)
  const service = useService(id, toggleLoadingState)
  if (loading) {
    return <Loading />
  }

  if (!service?.title) {
    return (
      <div className='container'>
        <h1>No Service with this id {id} exists</h1>
      </div>
    )
  }

  return (
    <div className='container'>
      <h1>Edit Service</h1>
      <ServiceForm title={service.title} description={service.description} features={service.features} />
    </div>
  )
}

export default EditService as unknown as () => JSX.Element
