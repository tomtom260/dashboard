import { useContext } from 'react'
import { useHistory } from 'react-router'
import AuthForm from '../../components/AuthForm'
import { handleSignIn } from '../../utils/authActions'
import { UIContext } from '../../utils/UIProvider'
import { useLocation } from 'react-router-dom'
import Loading from '../../components/Loading'

type StateType = {
  email: string
  password: string
}

function SignIn() {
  const history = useHistory()
  const location = useLocation<{
    from?: string
  }>()

  const from = location?.state?.from

  const { toggleLoadingState, loading } = useContext(UIContext)

  const handleSubmit = async (
    state: StateType,
    setError: (error: string | undefined) => void
  ) => {
    handleSignIn(
      state.email,
      state.password,
      toggleLoadingState,
      from,
      history,
      setError
    )
  }

  return loading ? (
    <Loading />
  ) : (
    <AuthForm formItems={['email', 'password']} handleSubmit={handleSubmit} />
  )
}

export default SignIn
