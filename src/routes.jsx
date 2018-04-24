import React, { Fragment } from 'react';
import { Switch, Route, Redirect } from 'react-router';

import App from '@components/App';
import Main from '@components/Main';
import Inventory from '@components/Inventory';
import Orders from '@components/Orders';
import Charts from '@components/Charts';
import AppBar from 'material-ui/AppBar';

const DefaultContentLayout = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={matchProps => (
      <Fragment>
        <AppBar
          title="Friendly Suppliers"
          iconStyleLeft={{ display: 'none' }}
        />
        <Main />
        <Component {...matchProps} />
      </Fragment>
    )}
  />
);

export default (
  <App>
    <Switch>
      <DefaultContentLayout exact path="/" component={() => <Redirect to="/inventory" />} />
      <DefaultContentLayout exact path="/inventory" component={Inventory} />
      <DefaultContentLayout exact path="/orders" component={Orders} />
      <DefaultContentLayout exact path="/charts" component={Charts} />
    </Switch>
  </App>
);
