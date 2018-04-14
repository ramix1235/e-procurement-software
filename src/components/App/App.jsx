import { Component } from 'react';
import PropTypes from 'prop-types';

import './App.scss';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
  }

  render() {
    const { children } = this.props;

    return (
      children
    );
  }
}
