import { User } from '@firebase/auth'
import { useContext, ComponentType } from 'react'
import { Redirect, Route } from 'react-router'
import { AuthContext } from './utils/AuthProvider'

type PrivateRouteProps = {
  component: ComponentType
  path: string
  exact?: boolean
}

function PrivateRoute({ component: Component, ...rest }: PrivateRouteProps) {
  const { user } = useContext<{ user: User | undefined }>(AuthContext)
  return (
    <Route
      {...rest}
      component={(props: any) => {
        return user ? <Component {...props} /> : <Redirect to='/signin' />
      }}
    />
  )
}

export default PrivateRoute
