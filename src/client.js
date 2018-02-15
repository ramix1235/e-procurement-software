import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Main from './components/Main';
import configureStore from './redux/store';

ReactDOM.render(
  <MuiThemeProvider>
    <Provider store={configureStore()}>
      <Main />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('react-view')
);