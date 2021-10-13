import { User, onAuthStateChanged, getAuth } from '@firebase/auth'
import React, { createContext, ReactNode, useState, useEffect } from 'react'

type AuthContextType = {
  user: undefined | User
}

export const AuthContext = createContext<AuthContextType>({
  user: undefined,
})

function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>()

  useEffect(() => {
    const auth = getAuth()
    onAuthStateChanged(auth, firebaseUser => {
      setUser(firebaseUser as User)
    })
  }, [])

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider
