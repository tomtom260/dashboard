type ActionType = {
  payload: ServiceType
  type: 'edit-service' | 'add-service' | 'remove-service'
}

export type ServiceType = {
  id: string
  title: string
  description: string
}

const initalState = [
  {
    id: '1',
    title: 'Employee managment system',
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
  },
  {
    id: '2',
    title: 'School managment system',
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
  },
  {
    id: '3',
    title: 'payroll managment system',
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
  },
]

const reducer = (state: ServiceType[] = initalState, action: ActionType) => {
  switch (action.type) {
    case 'add-service':
      state.push(action.payload)
      return state
    case 'edit-service':
      const serviceIndex = state.findIndex(
        service => service.id === action.payload.id
      )
      console.log(action.payload.id)
      state[serviceIndex] = action.payload
      console.log(state)
      return state
    case 'remove-service':
      return state.filter(service => service.id !== action.payload.id)
    default:
      return state
  }
}

export default reducer
