import React from 'react';
import { Switch, Route } from 'react-router';

import App from '@components/App';
import Main from '@components/Main';

export default (
  <App>
    <Switch>
      <Route component={Main} path="/" />
    </Switch>
  </App>
);
