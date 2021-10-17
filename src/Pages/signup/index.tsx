import AuthForm from '../../components/AuthForm'
import { handleSignUp } from '../../utils/authActions'
import { useHistory } from 'react-router-dom'
import { useContext } from 'react'
import { UIContext } from '../../utils/UIProvider'
import { useLocation } from 'react-router-dom'
import Loading from '../../components/Loading'
import { AuthContext } from '../../utils/AuthProvider'

type StateType = {
  name: string
  email: string
  password: string
  passwordConfirm: string
}

function SignUp() {
  const history = useHistory()
  const { toggleLoadingState, loading } = useContext(UIContext)
  const { setError } = useContext(AuthContext)

  const location = useLocation<{
    from?: string
  }>()

  const from = location?.state?.from

  const handleSubmit = async (
    state: StateType,
    setError: (error: string | undefined) => void
  ) => {
    if (state.password !== state.passwordConfirm) {
      setError("passwords don't match")
      return
    }

    handleSignUp(
      state.email,
      state.password,
      state.name,
      toggleLoadingState,
      history,
      from,
      setError
    )
  }

  return loading ? (
    <Loading />
  ) : (
    <AuthForm
      formItems={['name', 'email', 'password', 'passwordConfirm']}
      handleSubmit={handleSubmit}
    />
  )
}

export default SignUp
