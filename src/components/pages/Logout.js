import React from 'react';
// import styled from 'styled-components';

import { useAuth } from 'contexts/AuthContext';
import { Redirect } from 'react-router-dom';

// const Styles = styled.div``;

export default function Logout() {
  const { logout } = useAuth();

  logout();

  return <Redirect to="/login" />;
}
