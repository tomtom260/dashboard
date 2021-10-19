type Payload = {
  id: string
  user: string
}

type ACtionTypeInit = {
  type: 'init-inquiries'
  payload: InquiriesType[]
}

type ActionType = {
  payload: Payload
  type: 'seen' | 'handled'
}

export type InquiriesType = {
  id: string
  email: string
  service: string
  date: number
  seen: string[]
  handledBy: string
  fullName: string
  message: string
}

const reducer = (
  state: InquiriesType[] = [],
  action: ActionType | ACtionTypeInit
) => {
  let inquiryIndex: number
  if (action.type === 'seen' || action.type === 'handled') {
    inquiryIndex = state.findIndex(inquiry => {
      return inquiry.id === action.payload.id
    })
  }
  switch (action.type) {
    case 'init-inquiries':
      return action.payload
    case 'seen':
      state[inquiryIndex!].seen.push(action.payload.user)
      return state
    case 'handled':
      state[inquiryIndex!].handledBy = action.payload.user!
      return [...state]
    default:
      return state
  }
}

export default reducer
