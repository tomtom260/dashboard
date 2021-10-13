import { useDispatch, useSelector } from 'react-redux'
import { StoreType } from '../store'
import { fetchServices } from '../store/actions/services'
import { ServiceType } from '../store/reducers/services'

function useServices(toggleLoadingState: (value: boolean) => void) {
  const dispatch = useDispatch()
  return useSelector<StoreType, ServiceType[]>(state => {
    // check from redux
    let services = state.services
    if (services.length === 0) {
      toggleLoadingState(true)
      // check from firestore
      fetchServices(dispatch).then(data => {
        services = data
        toggleLoadingState(false)
      })
    }

    return services
  })
}

export default useServices
