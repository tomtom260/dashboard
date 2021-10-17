import {
  getAuth,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
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
