import React from 'react';
import styled from 'styled-components';
import Button from 'components/common/Button';

const Styles = styled.div``;

export default function Login() {
  return (
    <Styles>
      <h2>Login</h2>
      <input type="text" placeholder="Username" />
      <input type="password" placeholder="Password" />
      <Button>Sign up</Button>
    </Styles>
  );
}
