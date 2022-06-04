import React from 'react';
import { Route, Redirect } from 'react-router-dom';


const ProtectedRoute = ({ component: Component, ...props }) => {

  return (
    <Route {...props} render={
      props => <Component {...props} {...props} />
    } />
  )
};

export default ProtectedRoute;