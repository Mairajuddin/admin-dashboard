import React,{useContext} from 'react'
import { ContextApi } from './ContextProvider'

import {Navigate,Outlet} from 'react-router-dom'

const AuthComponent = () => {
    const context = useContext(ContextApi);
    const {user}=context;
    // console.log(user,'user')
  return user ? <Outlet /> : <Navigate to="/login" />
}

export default AuthComponent