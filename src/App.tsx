import { Provider } from 'react-redux'

// import app from './firebase'
import store from './store'
import Router from './router'
import UIProvider from './utils/UIProvider'

function App() {
  return (
    <Provider store={store}>
      <UIProvider>
        <Router />
      </UIProvider>
    </Provider>
  )
}

export default App
