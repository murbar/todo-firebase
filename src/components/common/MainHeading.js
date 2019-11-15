import styled from 'styled-components';

export default styled.h1`
  color: ${p => (p.label ? p.theme.colors[p.label] : 'inherit')};
  font-size: 3.5rem;
  display: flex;
  align-items: center;
`;
