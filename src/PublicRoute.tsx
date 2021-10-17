import { useContext, ComponentType } from 'react'
import { Redirect, Route } from 'react-router'
import { AuthContext, AuthContextType } from './utils/AuthProvider'

type PublicRouteProps = {
  component: ComponentType
  path: string
  exact?: boolean
}

function PublicRoute({ component: Component, ...rest }: PublicRouteProps) {
  const { user, from } = useContext<AuthContextType>(AuthContext)
  console.log(from)
  return (
    <Route
      {...rest}
      component={(props: any) => {
        return !user ? <Component {...props} /> : <Redirect to={from} />
      }}
    />
  )
}

export default PublicRoute
