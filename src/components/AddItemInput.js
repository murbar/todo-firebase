import React from 'react';
import styled from 'styled-components';
import Input from './common/Input';

const Styles = styled.div``;

export default function AddItemInput({ addItem }) {
  const [itemTitle, setItemTitle] = React.useState('');

  const handleAdd = () => {
    if (itemTitle.length) addItem(itemTitle);
    setItemTitle('');
  };

  const handleKeyPress = ({ key }) => {
    if (key === 'Enter') handleAdd();
  };

  return (
    <Styles>
      <Input
        type="text"
        placeholder="Add item..."
        value={itemTitle}
        onChange={e => setItemTitle(e.target.value)}
        onKeyPress={handleKeyPress}
      />
    </Styles>
  );
}
