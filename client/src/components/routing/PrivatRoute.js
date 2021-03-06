import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/auth/AuthContext';

const PrivatRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);
  const { loading, isAuthenticated } = authContext;
  return (
    <Route
      {...rest}
      render={props =>
        !isAuthenticated && !loading ? (
          <Redirect to='/login' />
        ) : (
          <Component {...props} />
        )
      }
    ></Route>
  );
};

export default PrivatRoute;
