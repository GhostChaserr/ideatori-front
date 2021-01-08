import React from 'react'
import { IAuthContext } from './interface'

const AuthContext = React.createContext<IAuthContext>({
  setContext: undefined,
  isAuthed: false,
  user: {},
})


export default AuthContext