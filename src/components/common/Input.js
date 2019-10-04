import styled, { css } from 'styled-components';

const errorState = css`
  box-shadow: 0 0 0 0.2rem inset rgba(200, 20, 60, 0.8),
    0 0 0 0.2rem ${p => p.theme.textColor};
`;

export default styled.input`
  background: white;
  color: inherit;
  border: 0;
  font-size: 2rem;
  font-family: ${p => p.theme.fontFamily};
  padding: 0.5em 0.75em 0.5em;
  border-radius: 0.5rem;
  &:focus {
    outline: none;
    /* background: white; */
    color: black;
  }
  ${p => p.error && errorState}
`;
