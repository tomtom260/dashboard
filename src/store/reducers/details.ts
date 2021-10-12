type ActionType = {
  payload: DetailsType
  type: 'add-details'
}

export type DetailsType = {
  id: string
  title: string
  description: string
  addedBy: string
  date: number
}

const initalState = [
  {
    id: '1',
    title: 'Employee managment system',
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
    date: 0,
    addedBy: 'user45',
  },
  {
    id: '2',
    title: 'School managment system',
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
    date: 0,
    addedBy: 'user45',
  },
  {
    id: '3',
    title: 'payroll managment system',
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
    date: 0,
    addedBy: 'user45',
  },
]

const reducer = (state: DetailsType[] = initalState, action: ActionType) => {
  switch (action.type) {
    case 'add-details':
      state.push(action.payload)
      return state
    default:
      return state
  }
}

export default reducer
