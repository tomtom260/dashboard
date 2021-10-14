import {
  getAuth,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'
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
  toggleLoadingState: (value: boolean) => void
) => {
  const auth = getAuth()
  toggleLoadingState(true)
  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      // Signed in
    })
    .catch(error => {
      const errorMessage = error.message
      console.log(errorMessage)
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
  history: any
) => {
  const auth = getAuth()
  toggleLoadingState(true)
  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      // Signed in
      const user = userCredential.user
      updateProfile(user, {
        displayName: name,
        //   photoURL: 'https://example.com/jane-q-user/profile.jpg',
      })
        .then(() => {
          history.push('/')
        })
        .catch(error => {
          console.log(error)
        })

      // ...
    })
    .catch(error => {
      const errorMessage = error.message
      console.log(errorMessage)
      // ..
    })
    .finally(() => {
      toggleLoadingState(false)
    })
}
