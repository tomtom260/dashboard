import { Provider } from 'react-redux'

// import app from './firebase'
import store from './store'
import Router from './router'
import UIProvider from './utils/UIProvider'
import AuthProvider from './utils/AuthProvider'

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <UIProvider>
          <Router />
        </UIProvider>
      </AuthProvider>
    </Provider>
  )
}

export default App
