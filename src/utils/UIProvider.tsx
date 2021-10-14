import { createContext, ReactNode, useState } from 'react'

type UIContextType = {
  loading: boolean
  toggleLoadingState: (value: boolean) => void
  countInquiries: number
  incCountInquiries: () => void
  decCountInquiries: () => void
}
type UIProvideProps = {
  children: ReactNode
}
export const UIContext = createContext<UIContextType>({} as UIContextType)

function UIProvider({ children }: UIProvideProps) {
  const [loading, setLoading] = useState<boolean>(false)
  const [countInquiries, setCountInquiries] = useState<number>(0)
  const toggleLoadingState = (value: boolean) => setLoading(value)

  const decCountInquiries = () => setCountInquiries(count => --count)
  const incCountInquiries = () => setCountInquiries(count => ++count)

  return (
    <UIContext.Provider
      value={{
        loading,
        toggleLoadingState,
        countInquiries,
        incCountInquiries,
        decCountInquiries,
      }}
    >
      {children}
    </UIContext.Provider>
  )
}

export default UIProvider
