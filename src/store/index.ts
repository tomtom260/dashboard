import { combineReducers, createStore, Store } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import inquiriesReducer from './reducers/inquiries'
import servicesReducer from './reducers/services'
import detailsReducer from './reducers/details'

const store = createStore(
  combineReducers({
    inquiries: inquiriesReducer,
    services: servicesReducer,
    details: detailsReducer,
  }),
  composeWithDevTools()
)

export type StoreType = ReturnType<typeof store.getState>

export default store
