import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from 'components/Header';
import ErrorBoundary from 'components/common/ErrorBoundary';
import Lists from 'components/Lists';
import List from 'components/List';
import Signup from 'components/Signup';
import Login from 'components/Login';
import Search from 'components/Search';

const Styles = styled.div`
  margin: 0 auto;
  padding: 0 2rem 3rem;
  max-width: 60rem;
`;

function App() {
  return (
    <ErrorBoundary>
      <Styles>
        <Header />
        <Router>
          <Search />
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/lists/:slug" component={List} />
            <Route path="/lists" component={Lists} />
          </Switch>
        </Router>
      </Styles>
    </ErrorBoundary>
  );
}

export default App;
