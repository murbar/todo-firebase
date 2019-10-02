import React from 'react';
import { useAuth } from 'contexts/AuthContext';
import { Route, Redirect, useLocation } from 'react-router-dom';
import Loading from 'components/common/Loading';

export default function ProtectedRoute({ component: Component, ...rest }) {
  const { user, isInitialized } = useAuth();
  const location = useLocation();

  if (isInitialized && !user)
    return <Redirect to={{ pathname: '/login', state: { from: location } }} />;

  return (
    <Route
      {...rest}
      render={props => (isInitialized ? <Component {...props} /> : <Loading />)}
    />
  );
}
