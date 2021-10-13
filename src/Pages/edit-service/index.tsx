import ServiceForm from '../../components/ServiceForm'
import { useParams } from 'react-router'
import './styles.css'
import { useContext } from 'react'
import { UIContext } from '../../utils/UIProvider'
import useService from '../../utils/useService'

function EditService() {
  const { id } = useParams<{ id: string }>()

  const { loading, toggleLoadingState } = useContext(UIContext)

  let service = useService(id, toggleLoadingState)

  if (!service.title) {
    return (
      <div className='container'>
        <h1>No Service with this id {id} exists</h1>
      </div>
    )
  }

  return (
    <div className='container'>
      <h1>Edit Service</h1>
      {loading ? (
        <div>LOADING...</div>
      ) : (
        <ServiceForm title={service.title} description={service.description} />
      )}
    </div>
  )
}

export default EditService
