import {
  getAuth,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth'

import { History } from 'history'

export const handleLogout = () => {
  const auth = getAuth()
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch(error => {
      // An error happened.
      console.log(error)
    })
}

export const handleSignIn = async (
  email: string,
  password: string,
  toggleLoadingState: (value: boolean) => void,
  from: string | undefined = '/',
  history: History<unknown>,
  setError: (error: string | undefined) => void
) => {
  const auth = getAuth()
  setError(undefined)
  toggleLoadingState(true)
  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      history.push(from)
    })
    .catch(error => {
      setError(formatError(error.code))
    })
    .finally(() => {
      toggleLoadingState(false)
    })
}

export const handleSignUp = async (
  email: string,
  password: string,
  name: string,
  toggleLoadingState: (value: boolean) => void,
  history: History<unknown>,
  from: string | undefined = '/',
  setError: (error: string | undefined) => void
) => {
  const auth = getAuth()
  toggleLoadingState(true)
  setError(undefined)
  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      const user = userCredential.user
      updateProfile(user, {
        displayName: name,
        //   photoURL: 'https://example.com/jane-q-user/profile.jpg',
      })
        .then(() => {
          history.push(from)
        })
        .catch(error => {
          console.log(error.code)
          setError(formatError(error.code))
        })

      // ...
    })
    .catch(error => {
      // console.log(errorMessage)
      setError(formatError(error.code))
      // ..
    })
    .finally(() => {
      toggleLoadingState(false)
    })
}

export const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider()
  const auth = getAuth()
  signInWithPopup(auth, provider)
    .then(result => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result)
      // The signed-in user info.
      const user = result.user
      // ...
    })
    .catch(error => {
      // Handle Errors here.
      const errorCode = error.code
      const errorMessage = error.message
      console.log(error.code)
      // The email of the user's account used.
      // The AuthCredential type that was used.
      // ...
    })
}

const formatError = (error: string) => {
  switch (error) {
    case 'auth/wrong-password':
      return 'email and password do not match'
    case 'auth/user-not-found':
      return "user with that email doesn't exist"
    case 'auth/email-already-in-use':
    case 'auth/email-already-exists':
      return 'email already exists'
    case 'auth/invalid-password':
    case 'auth/weak-password':
      return 'password must have atleast 6 characters'
    case 'firebase auth/too-many-requests':
      return 'too many requests. try again later'
  }
}
