import { IUser } from 'interface'

interface IAuthContext {
  user: IUser
  isAuthed: boolean
  setContext: any
}

export default IAuthContext
