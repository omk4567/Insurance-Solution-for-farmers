import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = ({children,isAuthenticated,adminOnly=false,isAdmin}) => {

   if(!isAuthenticated) return <Navigate to={"/login"}/> ;

   if(adminOnly){
        if(!isAdmin) return <Navigate to={"/"}/>;
   }



  return (
        children ? children : <Outlet />
  )
}

export default ProtectedRoute