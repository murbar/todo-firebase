import React from 'react';
import styled from 'styled-components';
import useLocalStorageState from 'hooks/useLocalStorageState';
import { Link } from 'react-router-dom';
import AddListInput from './AddListInput';
import uuid from 'uuid/v4';
import slugify from 'url-slug';

const Styles = styled.div``;

const constructNewList = title => ({
  id: uuid(),
  title,
  slug: slugify(title)
});

export default function Lists() {
  const [listsData, setListsData] = useLocalStorageState('lists-data', [
    { id: '1', title: 'Groceries', slug: 'groceries' },
    { id: '2', title: 'Books to read', slug: 'books-to-read' }
  ]);

  React.useEffect(() => {
    // fetch lists
  }, []);

  const createNewList = title => {
    setListsData(prev => [...prev, constructNewList(title)]);
  };

  const removeList = id => {
    setListsData(prev => prev.filter(l => l.id !== id));
  };

  return (
    <Styles>
      <h2>My Lists</h2>
      <AddListInput addList={createNewList} />
      {listsData.map(l => (
        <div key={l.id}>
          <Link to={`/lists/${l.slug}`}>{l.title}</Link>{' '}
          <button onClick={() => removeList(l.id)}>X</button>
        </div>
      ))}
    </Styles>
  );
}
