/* eslint-disable no-underscore-dangle */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { TextField, FlatButton } from 'material-ui';

export default class CurrencyForm extends Component {
  static propTypes = {
    getActions: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    item: PropTypes.object,
  }

  static defaultProps = {
    item: {
      _id: null,
      name: '',
    },
  }

  componentWillMount() {
    const { getActions, onClose } = this.props;
    const actions = [
      <FlatButton
        key={0}
        label="Ok"
        primary
        onClick={this.handleSubmitClick}
      />,
      <FlatButton
        key={1}
        label="Discard"
        primary
        onClick={onClose}
      />,
    ];

    getActions(actions);
  }

  handleSubmitClick = () => {
    const { onSubmit, item } = this.props;

    const model = {
      _id: item._id,
      name: this.nameField.input.value,
    };

    onSubmit(model);
  }

  render() {
    const { item } = this.props;

    return (
      <Fragment>
        <TextField
          ref={(ref) => { this.nameField = ref; }}
          floatingLabelText="Name"
          className="space-left-s"
          defaultValue={item.name}
        />
      </Fragment>
    );
  }
}
