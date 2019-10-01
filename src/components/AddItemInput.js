import React from 'react';
import styled from 'styled-components';

const Styles = styled.div``;

export default function AddItemInput({ addItem }) {
  const [itemTitle, setItemTitle] = React.useState('');

  const handleAdd = () => {
    const successful = addItem(itemTitle);
    if (successful) {
      setItemTitle('');
    } else {
      // handle add error
    }
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
