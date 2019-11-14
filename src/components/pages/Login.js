import React from 'react';
import styled from 'styled-components';
import { Redirect, useLocation } from 'react-router-dom';
import Button from 'components/common/Button';
import Input from 'components/common/Input';
import useForm from 'hooks/useForm';
import { useAuth } from 'contexts/AuthContext';
import config from 'config';
import FormField from 'components/common/FormField';

const Styles = styled.div``;

export default function Login() {
  const { user, loginWithEmail } = useAuth();
  const location = useLocation();
  const { from } = location.state || {
    from: { pathname: config.defaultLoginDestination }
  };
  const { values, handleChange, handleSubmit } = useForm(() => {
    loginWithEmail(values.email, values.password, values.remember);
  });

  return user ? (
    <Redirect to={from} />
  ) : (
    <Styles>
      <h2>Welcome back</h2>
      <form onSubmit={handleSubmit}>
        <FormField>
          <Input
            name="email"
            type="text"
            placeholder="Username"
            onChange={handleChange}
            value={values.email || ''}
          />
        </FormField>
        <FormField>
          <Input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            value={values.password || ''}
          />
        </FormField>
        <FormField>
          <label htmlFor="">
            Remember me?
            <input
              name="remember"
              type="checkbox"
              checked={values.remember === undefined ? true : values.remember}
              onChange={handleChange}
            />
          </label>
        </FormField>
        <FormField>
          <Button type="submit">Login</Button>
        </FormField>
      </form>
    </Styles>
  );
}
