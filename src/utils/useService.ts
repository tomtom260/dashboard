import { useSelector, useDispatch } from 'react-redux'
import { StoreType } from '../store'
import { addServiceToRedux, fetchService } from '../store/actions/services'
import { ServiceType } from '../store/reducers/services'

function useService(id: string, toggleLoadingState: (value: boolean) => void) {
  const dispatch = useDispatch()

  return useSelector<StoreType, ServiceType>(state => {
    // check from redux
    let serv = state.services.find(service => service.id === id)
    if (!serv) {
      toggleLoadingState(true)
      // check from firestore
      fetchService({ id }).then(val => {
        serv = val as ServiceType
        addServiceToRedux(dispatch, serv)
        toggleLoadingState(false)
      })
    }

    return { ...serv!, id }
  })
}

export default useService
