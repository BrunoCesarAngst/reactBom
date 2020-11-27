import React from 'react'
import { Route } from 'react-router-dom';
import { isAdmin } from '../Auth';


export default function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAdmin() ? (
          <Component {...props} />
        ) : (
          console.log("Oi, você não está logado!!!")
        )
      }
    />
  );
}