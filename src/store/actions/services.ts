export const addService = (dispatch: any, payload: any) => {
  dispatch({
    type: 'add-service',
    payload,
  })
}

export const editService = (dispatch: any, payload: any) => {
  dispatch({
    type: 'edit-service',
    payload,
  })
}
export const removeService = (dispatch: any, payload: any) => {
  dispatch({
    type: 'remove-service',
    payload,
  })
}
