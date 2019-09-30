import React from 'react';
import styled from 'styled-components';

// search list titles
// search list item titles
// get data stored in LS first,
// search the database async
// add results to local results

const Styles = styled.div``;

export default function Search() {
  return (
    <Styles>
      <input type="text" placeholder="Search" />
      <button>Search</button>
    </Styles>
  );
}
