import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'
import SignUp from 'pages/SignUp'
import Home from 'pages/Home'
import SignIn from 'pages/SignIn'
import Private from './Private'
import Profile from 'pages/Profile'

const Links = () => {
  return (
    <ul>
      <li>
        <Link style={{ color: 'blue' }} to='/signup'>
          Signup
        </Link>
      </li>
      <li>
        <Link style={{ color: 'blue' }}  to='/'>
          Home
        </Link>
      </li>
      <li>
        <Link style={{ color: 'blue' }}  to='/signin'>
          Signin
        </Link>
      </li>
      <li>
        <Link style={{ color: 'blue' }}  to='/profile'>
          Profile
        </Link>
      </li>
    </ul>
  )
}

const Router = () => {
  return (
    <BrowserRouter>
      <Links/>
      <Switch>
        <Route path='/' exact={true} component={Home} />
        <Private path='/profile' exact={true} component={Profile} />
        <Route  path='/signup' component={SignUp} />
        <Route  path='/signin' component={SignIn} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router