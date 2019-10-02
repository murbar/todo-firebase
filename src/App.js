import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ErrorBoundary from 'components/common/ErrorBoundary';
import Header from 'components/Header';
import Navigation from 'components/Navigation';
import Landing from 'components/pages/Landing';
import Search from 'components/Search';
import Signup from 'components/pages/Signup';
import Login from 'components/pages/Login';
import Logout from 'components/pages/Logout';
import ProtectedRoute from 'components/ProtectedRoute';
import Lists from 'components/Lists';
import List from 'components/List';
import NotFound from 'components/pages/NotFound';

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
          <Navigation />
          <Search />
          <Switch>
            <Route path="/" exact={true} component={Landing} />
            <ProtectedRoute path="/lists/:slug" component={List} />
            <ProtectedRoute path="/lists" component={Lists} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <Route path="/signup" component={Signup} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </Styles>
    </ErrorBoundary>
  );
}

export default App;
