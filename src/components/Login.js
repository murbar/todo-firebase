import React from 'react';
import styled from 'styled-components';
import Button from 'components/common/Button';
import useForm from 'hooks/useForm';
import { useAuth } from 'contexts/AuthContext';
import { Redirect } from 'react-router-dom';

const Styles = styled.div``;

export default function Login() {
  const { user, loginWithEmail } = useAuth();
  const { values, handleChange, handleSubmit } = useForm(() => {
    loginWithEmail(values.email, values.password, values.remember);
  });

  return user ? (
    <Redirect to="/lists" />
  ) : (
    <Styles>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="text"
          placeholder="Username"
          onChange={handleChange}
          value={values.email || ''}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          value={values.password || ''}
        />
        <label htmlFor="">
          Remember me?
          <input
            name="remember"
            type="checkbox"
            checked={values.remember === undefined ? true : values.remember}
            onChange={handleChange}
          />
        </label>
        <Button type="submit">Sign up</Button>
      </form>
    </Styles>
  );
}
