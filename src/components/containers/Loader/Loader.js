import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import CircularProgress from 'material-ui/CircularProgress';

export default class Loader extends Component {
  static propsTypes = {
    size: PropTypes.string,
    thickness: PropTypes.string,
    className: PropTypes.string,
  }

  static defaultPropTypes = {
    size: 80,
    thickness: 5,
    className: '',
  }
  render() {
    const { size, thickness, className } = this.props;

    return <div className={classnames('spinner', className)}><CircularProgress size={size} thickness={thickness} /></div>;
  }
}
