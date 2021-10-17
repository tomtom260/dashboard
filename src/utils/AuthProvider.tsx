import { User, onAuthStateChanged, getAuth } from '@firebase/auth'
import React, {
  useRef,
  createContext,
  ReactNode,
  useState,
  useEffect,
  useContext,
} from 'react'
import Loading from '../components/Loading'
import { UIContext } from './UIProvider'

export type AuthContextType = {
  user: undefined | User
  from: string
  error: string | undefined
  setError: (value: string | undefined) => void
}

export const AuthContext = createContext<AuthContextType>({
  user: undefined,
} as AuthContextType)

function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>()
  const [from, setFrom] = useState<string>('/')
  const [error, setError] = useState<string | undefined>(undefined)

  const historyRef = useRef(window.location.href)
  const { toggleLoadingState } = useContext(UIContext)

  useEffect(() => {
    const path = process.env.REACT_APP_PUBLIC_URL as string
    setFrom(historyRef.current.substring(path.length))
  }, [])

  useEffect(() => {
    toggleLoadingState(true)
    const auth = getAuth()
    onAuthStateChanged(auth, firebaseUser => {
      setUser(firebaseUser as User)
      toggleLoadingState(false)
    })
  }, [])

  return (
    <AuthContext.Provider value={{ user, from, error, setError }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
