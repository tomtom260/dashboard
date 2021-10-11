import React from 'react'
import Home from './Home'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import AddService from './add-service'
import Navigation from './components/Navigation'
import Details from './Details'
import EditService from './edit-service'

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDXNkjthwcDNQM9GaKtsgAmDb_8erw_HBY",
//   authDomain: "ecomm-29f20.firebaseapp.com",
//   projectId: "ecomm-29f20",
//   storageBucket: "ecomm-29f20.appspot.com",
//   messagingSenderId: "8817596019",
//   appId: "1:8817596019:web:9463a7d08bb561f5bdfc06"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

function App() {
  return (
    <>
      <BrowserRouter>
        <Navigation />
        <Switch>
          <Route path='/add-service' component={AddService} />
          <Route path='/' exact component={Home} />
          <Route path='/details/:id' exact component={Details} />
          <Route path='/edit/:id' exact component={EditService} />
        </Switch>
      </BrowserRouter>
    </>
  )
}

export default App
