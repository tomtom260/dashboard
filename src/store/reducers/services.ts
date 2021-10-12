type ActionType = {
  payload: ServiceType
  type: 'edit-service' | 'add-service' | 'remove-service'
}

type ActionTypeInit = {
  type: 'init-service'
  payload: ServiceType[]
}

export type ServiceType = {
  id: string
  title: string
  description: string
  date: number
  addedBy: string
}

// const initialState = fetchServices()

// const initalState = [
//   {
//     id: '1',
//     title: 'Employee managment system',
//     description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
//   },
//   {
//     id: '2',
//     title: 'School managment system',
//     description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
//   },
//   {
//     id: '3',
//     title: 'payroll managment system',
//     description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
//   },
// ]

const reducer = (
  state: ServiceType[] = [],
  action: ActionType | ActionTypeInit
) => {
  switch (action.type) {
    case 'init-service':
      return action.payload
    case 'add-service':
      state.push(action.payload)
      return state
    case 'edit-service':
      const serviceIndex = state.findIndex(
        service => service.id === action.payload.id
      )
      state[serviceIndex] = action.payload
      return state
    case 'remove-service':
      return state.filter(service => service.id !== action.payload.id)
    default:
      return state
  }
}

export default reducer
