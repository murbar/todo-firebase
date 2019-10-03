import React from 'react';
import styled from 'styled-components';

const Styles = styled.div``;

export default function AddListInput({ addList }) {
  const [listTitle, setListTitle] = React.useState('');

  const handleAdd = () => {
    if (listTitle.length) addList(listTitle);
    setListTitle('');
  };

  const handleKeyPress = e => {
    const { key } = e;
    if (key === 'Enter') handleAdd();
  };

  return (
    <Styles>
      <input
        type="text"
        placeholder="New list"
        value={listTitle}
        onChange={e => setListTitle(e.target.value)}
        onKeyPress={handleKeyPress}
      />
    </Styles>
  );
}
