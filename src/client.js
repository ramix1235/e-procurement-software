import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter } from 'react-router-dom';
import configureStore from './redux/store';
import routes from './routes';

ReactDOM.render(
  <MuiThemeProvider>
    <Provider store={configureStore()}>
      <BrowserRouter>
        {routes}
      </BrowserRouter>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('react-view')
);
