import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import AddAction from './OrderAddAction';
import DeleteAction from './OrderDeleteAction';
import EditAction from './OrderEditAction';

export default class OrderActions extends Component {
  static propTypes = {
    item: PropTypes.object,
  }

  static defaultProps = {
    item: undefined,
  }

  render() {
    const { item } = this.props;

    return item ? (
      <Fragment>
        <DeleteAction item={item} />
        <EditAction item={item} />
      </Fragment>)
      : <AddAction />;
  }
}
