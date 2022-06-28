// This is created to redirect users that are not
//  logged in to the login page instead of taking them to the 
// create new ticket page directly without login

import React from 'react'
import {useAuthStatus} from '../hooks/useAuthStatus'
import { Navigate,Outlet } from 'react-router-dom'
import Spinner from './Spinner'
const PrivateRoute = () => {
  
  const {loggedIn,checkingStatus}=useAuthStatus();
    if(checkingStatus){
        return <Spinner/>
    }

    return loggedIn? <Outlet/>:<Navigate to='/login'/>
}

export default PrivateRoute