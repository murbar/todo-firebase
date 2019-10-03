import React from 'react';
import styled from 'styled-components';

const Styles = styled.div``;

export default function AddItemInput({ addItem }) {
  const [itemTitle, setItemTitle] = React.useState('');

  const handleAdd = () => {
    if (itemTitle.length) addItem(itemTitle);
    setItemTitle('');
  };

  const handleKeyPress = e => {
    const { key } = e;
    if (key === 'Enter') handleAdd();
  };

  return (
    <Styles>
      <input
        type="text"
        placeholder="New item"
        value={itemTitle}
        onChange={e => setItemTitle(e.target.value)}
        onKeyPress={handleKeyPress}
      />
    </Styles>
  );
}
