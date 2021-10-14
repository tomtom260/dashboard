import AuthForm from '../../components/AuthForm'
import { handleSignUp } from '../../utils/authActions'
import { useHistory } from 'react-router'
import { useContext } from 'react'
import { UIContext } from '../../utils/UIProvider'

type StateType = {
  name: string
  email: string
  password: string
  passwordConfirm: string
}

function SignUp() {
  const history = useHistory()
  const { toggleLoadingState, loading } = useContext(UIContext)
  const handleSubmit = async (state: StateType) => {
    if (state.password !== state.passwordConfirm) {
      console.log("passwords don't match")
      return
    }

    await handleSignUp(
      state.email,
      state.password,
      state.name,
      toggleLoadingState,
      history
    )
  }

  return loading ? (
    <div className='container'>LOADING...</div>
  ) : (
    <AuthForm
      formItems={['name', 'email', 'password', 'passwordConfirm']}
      handleSubmit={handleSubmit}
    />
  )
}

export default SignUp
