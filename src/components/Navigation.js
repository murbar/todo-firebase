import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from 'contexts/AuthContext';
import styled from 'styled-components';

const Styles = styled.div``;

export default function Navigation() {
  const { user } = useAuth();

  return (
    <Styles>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {user ? (
          <li>
            {user.email} - <Link to="/logout">Log out</Link>
          </li>
        ) : (
          <li>
            <Link to="/login">Log in</Link>
          </li>
        )}
        <li>
          <Link to="/lists">My lists</Link>
        </li>
      </ul>
    </Styles>
  );
}
