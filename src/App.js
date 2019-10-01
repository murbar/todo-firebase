import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Header from 'components/Header';
import ErrorBoundary from 'components/common/ErrorBoundary';
import Lists from 'components/Lists';
import List from 'components/List';
import Signup from 'components/Signup';
import Login from 'components/Login';
import Navigation from 'components/Navigation';
import Search from 'components/Search';
import Landing from 'components/Landing';
import { useAuth } from 'contexts/AuthContext';
// import useLogging from 'hooks/useLogging';
import Logout from 'components/Logout';

const Styles = styled.div`
  margin: 0 auto;
  padding: 0 2rem 3rem;
  max-width: 60rem;
`;

const Loading = () => <div>Loading...</div>;

function App() {
  const { user, isInitialized } = useAuth();

  // don't render router until user is initialized
  // if initialized and no user then clear local app data
  // useLogging(isInitialized, 'user initialized');

  return (
    <ErrorBoundary>
      <Styles>
        <Header />
        <Router>
          <Navigation />
          <Search />
          <Switch>
            <Route path="/" exact={true} component={Landing} />
            <Route path="/lists/:slug" component={List} />
            <Route path="/lists" component={Lists} />

            <Route path="/signup" component={Signup} />
            <Route path="/logout" component={Logout} />
            <Route component={Login} />
          </Switch>
        </Router>
      </Styles>
    </ErrorBoundary>
  );
}

export default App;
