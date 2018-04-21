import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter } from 'react-router-dom';
import Favicon from 'react-favicon';
import configureStore from './redux/store';
import routes from './routes';

const faviconUrl = '../public/favs/favicon32x32.ico';

ReactDOM.render(
  <MuiThemeProvider>
    <Favicon url={faviconUrl} />
    <Provider store={configureStore()}>
      <BrowserRouter>
        {routes}
      </BrowserRouter>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('react-view')
);
