import { useReducer } from 'react'
import { useLocation } from 'react-router'
import styles from './styles.module.css'

const reducer = (state, { payload, type }) => {
  switch (type) {
    case type: {
      return { ...state, [type]: payload }
    }
  }
}

const handleChange = (dispatch, e) => {
  dispatch({
    type: e.target.name,
    payload: e.target.value,
  })
}

const inputType = item => {
  switch (item) {
    case 'password':
    case 'passwordConfirm':
      return 'password'

    case 'email':
      return 'email'
    default:
      return 'text'
  }
}

function AuthForm({ formItems, handleSubmit }) {
  const location = useLocation()

  const initialState = {}
  formItems.forEach(item => {
    initialState[item] = ''
  })

  const [state, dispatch] = useReducer(reducer, initialState)
  let path
  location.pathname.includes('signin') ? (path = 'Sign In') : (path = 'Sign Up')

  return (
    <div className='container'>
      <h1>{path}</h1>
      <form
        onSubmit={e => {
          e.preventDefault()
          handleSubmit(state)
        }}
        className='form'
      >
        <>
          {formItems.map(item => {
            return (
              <div className='form__input' key={item}>
                <label htmlFor={`form-${item}`}>
                  {item.slice(0, 1).toUpperCase() + item.slice(1)}
                </label>
                <input
                  className={styles[`form__input-${item}`]}
                  type={inputType(item)}
                  id={`form-${item}`}
                  placeholder={item.slice(0, 1).toUpperCase() + item.slice(1)}
                  name={item}
                  value={state[item]}
                  onChange={e => handleChange(dispatch, e)}
                />
              </div>
            )
          })}
          <input
            type='submit'
            className='button--primary'
            value={path === 'register' ? 'Register' : 'Login'}
          />
        </>
      </form>
    </div>
  )
}

export default AuthForm
