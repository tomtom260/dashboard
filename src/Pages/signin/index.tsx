import { useHistory } from 'react-router'
import AuthForm from '../../components/form'
import { handleSignIn } from '../../utils/authActions'

type StateType = {
  email: string
  password: string
}

function SignIn() {
  const history = useHistory()
  const handleSubmit = async (state: StateType) => {
    await handleSignIn(state.email, state.password)
    history.push('/')
  }

  return (
    <AuthForm formItems={['email', 'password']} handleSubmit={handleSubmit} />
  )
}

export default SignIn
