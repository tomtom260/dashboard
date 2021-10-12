import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import inquiriesReducer from './reducers/inquiries'
import servicesReducer from './reducers/services'
import detailsReducer from './reducers/details'
import thunk from 'redux-thunk'

const store = createStore(
  combineReducers<StoreType>({
    inquiries: inquiriesReducer,
    services: servicesReducer,
    details: detailsReducer,
  }),
  compose(applyMiddleware(thunk) as any, composeWithDevTools())
)

export type StoreType = {
  inquiries: ReturnType<typeof inquiriesReducer>
  services: ReturnType<typeof servicesReducer>
  details: ReturnType<typeof detailsReducer>
}

export default store
