import React from 'react';
import styled from 'styled-components';
import Button from './common/Button';

const Styles = styled.div``;

export default function Signup() {
  return (
    <Styles>
      <h2>Create an account</h2>
      <input type="text" placeholder="Email" />
      <input type="text" placeholder="Username" />
      <input type="password" placeholder="Password" />
      <Button>Sign up</Button>
    </Styles>
  );
}
