type Payload = {
  id: number
  user?: string
}

type ActionType = {
  payload: Payload
  type: 'seen' | 'handled'
}

export type InquiriesType = {
  id: number
  email: string
  service: string
  date: number
  seen: boolean
  handledBy: string
}

const reducer = (state: InquiriesType[] = [], action: ActionType) => {
  const inquiryIndex = state.findIndex(
    inquiry => inquiry.id === action.payload.id
  )
  switch (action.type) {
    case 'seen':
      state[inquiryIndex].seen = true
      return state
    case 'handled':
      state[inquiryIndex].handledBy = action.payload.user!
      return state
    default:
      return state
  }
}

export default reducer
