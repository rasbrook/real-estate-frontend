import React from 'react'
import { useUserStore } from '../store/user.store'
import { Outlet,  Navigate} from 'react-router-dom'


export default function PrivateRoute() {
  const user=useUserStore((state)=>state.user)
  return user? <Outlet/>:<Navigate to="/sign-in"/>
}
