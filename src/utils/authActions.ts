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

export const handleSignIn = async (email: string, password: string) => {
  const auth = getAuth()
  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      // Signed in
      //   const user = userCredential.user
      // ...
    })
    .catch(error => {
      const errorMessage = error.message
      console.log(errorMessage)
    })
}

export const handleSignUp = async (
  email: string,
  password: string,
  name: string
) => {
  const auth = getAuth()
  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      // Signed in
      const user = userCredential.user
      updateProfile(user, {
        displayName: name,
        //   photoURL: 'https://example.com/jane-q-user/profile.jpg',
      })
        .then(() => {})
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
}
