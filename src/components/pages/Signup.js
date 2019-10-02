import React from 'react';
import styled from 'styled-components';
import { useAuth } from 'contexts/AuthContext';
import { Redirect } from 'react-router-dom';
import config from 'config';
import Button from 'components/common/Button';

const Styles = styled.div``;

export default function Signup() {
  const { user } = useAuth();

  return user ? (
    <Redirect to={config.defaultLoginDestination} />
  ) : (
    <Styles>
      <h2>Create an account</h2>
      <input type="text" placeholder="Email" />
      <input type="text" placeholder="Username" />
      <input type="password" placeholder="Password" />
      <Button>Sign up</Button>
    </Styles>
  );
}
