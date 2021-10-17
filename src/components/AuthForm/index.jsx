import { useContext, useReducer, useState } from 'react'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import styles from './styles.module.css'
import { FcGoogle } from 'react-icons/fc'
import { AuthContext } from '../../utils/AuthProvider'

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

  const { error, setError } = useContext(AuthContext)
  const [state, dispatch] = useReducer(reducer, initialState)

  let path
  location.pathname.includes('signin') ? (path = 'Sign In') : (path = 'Sign Up')

  return (
    <div className='container'>
      <div className={styles.form__container}>
        <h1>{path}</h1>
        <button className={styles.button__google}>
          <span>{<FcGoogle style={{ fontSize: '3rem' }} />}</span>
          <span style={{ fontFamily: 'Noto Sans Display, sans-serif' }}>
            Sign in with Google
          </span>
        </button>

        <div className={styles.divider}>
          <p className={styles.divider__line}>
            -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
          </p>
          <p className={styles.divider__text}>or Sign in with Email</p>
        </div>

        <div className={styles.error}>
          <p>{error}</p>
        </div>

        <form
          onSubmit={e => {
            e.preventDefault()
            handleSubmit(state, setError)
          }}
          className={styles.form}
        >
          <>
            {formItems.map(item => {
              return (
                <div className={styles.form__item} key={item}>
                  <label
                    className={styles.form__label}
                    htmlFor={`form-${item}`}
                  >
                    {item.slice(0, 1).toUpperCase() + item.slice(1)}
                  </label>
                  <input
                    className={styles[`form__input`]}
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
              className={styles.button__submit}
              type='submit'
              value={path}
            />
          </>
          <div className={styles.form__link}>
            {path === 'Sign In' ? (
              <>
                Not registered yet?{' '}
                <Link className={styles.button__text} to='signup'>
                  Create an Account
                </Link>
              </>
            ) : (
              <>
                Have an Account?{' '}
                <Link className={styles.button__text} to='signin'>
                  Sign in into Account
                </Link>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default AuthForm
