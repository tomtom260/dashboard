import { Provider } from 'react-redux'

// import app from './firebase'
import store from './store'
import Router from './router'
import UIProvider from './utils/UIProvider'
import AuthProvider from './utils/AuthProvider'

function App() {
  return (
    <UIProvider>
      <AuthProvider>
        <Provider store={store}>
          <Router />
        </Provider>
      </AuthProvider>
    </UIProvider>
  )
}

export default App
