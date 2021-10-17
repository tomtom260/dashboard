import { useContext, ComponentType } from 'react'
import { Redirect, Route } from 'react-router'
import { AuthContext, AuthContextType } from './utils/AuthProvider'

type PrivateRouteProps = {
  component: ComponentType
  path: string
  exact?: boolean
  location?: any
}

function PrivateRoute({ component: Component, ...rest }: PrivateRouteProps) {
  const { user } = useContext<AuthContextType>(AuthContext)
  const { pathname } = rest.location
  return (
    <Route
      {...rest}
      component={(props: any) => {
        return user ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/signin',
              state: {
                from: pathname,
              },
            }}
          />
        )
      }}
    />
  )
}

export default PrivateRoute
