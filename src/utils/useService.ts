import { useSelector, useDispatch } from 'react-redux'
import { StoreType } from '../store'
import { addServiceToRedux, fetchService } from '../store/actions/services'
import { ServiceType } from '../store/reducers/services'

function useService(id: string, toggleLoadingState: (value: boolean) => void) {
  const dispatch = useDispatch()
  let service = useSelector<StoreType, ServiceType | undefined>(state => {
    let serv = state.services.find(service => service.id === id)
    return serv
  })
  if (!service) {
    toggleLoadingState(true)
    fetchService({ id }).then(val => {
      service = { ...(val as ServiceType), id }
      val && addServiceToRedux(dispatch, service)
      toggleLoadingState(false)
    })
  }

  return service
}

export default useService
