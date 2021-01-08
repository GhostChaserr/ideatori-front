import AuthContext from 'context/AuthContex'
import React, { useContext } from 'react'


const Home = () => {
  const { isAuthed, user } = useContext(AuthContext)
  return (
    <div>
      Home ....
    </div>
  )
}

export default Home