import { useContext } from 'react'
import { useHistory } from 'react-router'
import AuthForm from '../../components/AuthForm'
import { handleSignIn } from '../../utils/authActions'
import { UIContext } from '../../utils/UIProvider'

type StateType = {
  email: string
  password: string
}

function SignIn() {
  const history = useHistory()
  const { toggleLoadingState, loading } = useContext(UIContext)

  const handleSubmit = async (state: StateType) => {
    handleSignIn(state.email, state.password, toggleLoadingState).then(() => {
      history.push('/')
    })
  }

  return loading ? (
    <div className='container'>LOADING...</div>
  ) : (
    <AuthForm formItems={['email', 'password']} handleSubmit={handleSubmit} />
  )
}

export default SignIn
