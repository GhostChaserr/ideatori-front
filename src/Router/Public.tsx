import AuthContext from 'context/AuthContex'
import { IAuthContext } from 'context/interface'
import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'

const Public = ({ component, isAuthenticated, ...rest }: any) => {
  const { isAuthed } = useContext<IAuthContext>(AuthContext)
  const routeComponent = (props: any) =>
  !isAuthed ? (
      React.createElement(component, props)
    ) : (
      <Redirect to={{ pathname: '/login' }} />
    )
  return <Route {...rest} render={routeComponent} />
}

export default Public
