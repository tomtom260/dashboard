import { User } from '@firebase/auth'
import { useContext, ComponentType } from 'react'
import { Redirect, Route } from 'react-router'
import { AuthContext } from './utils/AuthProvider'

type PublicRouteProps = {
  component: ComponentType
  path: string
  exact?: boolean
}

function PublicRoute({ component: Component, ...rest }: PublicRouteProps) {
  const { user } = useContext<{ user: User | undefined }>(AuthContext)

  return (
    <Route
      {...rest}
      component={(props: any) => {
        return !user ? <Component {...props} /> : <Redirect to='/' />
      }}
    />
  )
}

export default PublicRoute
