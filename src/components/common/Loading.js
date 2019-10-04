import React from 'react';
import styled from 'styled-components';

const Styles = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5000;
  display: flex;
  justify-content: center;
  padding-top: 15%;
  background: white;
`;

export default function Loading() {
  return <Styles>Loading...</Styles>;
}
