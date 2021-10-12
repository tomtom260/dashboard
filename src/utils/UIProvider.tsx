import { createContext, ReactNode, useState } from 'react'

type UIContextType = {
  loading: boolean
  toggleLoadingState: (value: boolean) => void
}
type UIProvideProps = {
  children: ReactNode
}
export const UIContext = createContext<UIContextType>({} as UIContextType)

function UIProvider({ children }: UIProvideProps) {
  const [loading, setLoading] = useState<boolean>(false)
  const toggleLoadingState = (value: boolean) => setLoading(value)

  return (
    <UIContext.Provider value={{ loading, toggleLoadingState }}>
      {children}
    </UIContext.Provider>
  )
}

export default UIProvider
