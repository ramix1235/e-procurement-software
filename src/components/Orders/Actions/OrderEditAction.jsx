/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { editOrder } from '../../../redux/actions/orderActions';

import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import Dialog from 'material-ui/Dialog';
import OrderForm from './Forms/OrderForm';
import Loader from '../../containers/Loader';

@connect()
export default class OrderAddAction extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
  }

  state = {
    open: false,
    feedback: false,
    feedbackMsg: 'Complete!',
    actions: [],
    isLoading: false,
  }

  handleOpen = () => {
    this.setState({ open: true });
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  handleRequestClose = () => {
    this.setState({ feedback: false });
  }

  handleEditData = (editingModel) => {
    const { dispatch } = this.props;

    this.setState({ feedback: true, isLoading: true });
    dispatch(editOrder(editingModel))
      .then(response => this.setState({ feedbackMsg: 'Complete!' }))
      .catch((err) => {
        if (err) this.setState({ feedbackMsg: 'Failed!' });
      })
      .finally(() => this.setState({ open: false, isLoading: false }));
  }

  getActions = (actions) => {
    this.setState({ actions });
  }

  render() {
    const {
      open,
      feedback,
      feedbackMsg,
      actions,
      isLoading,
    } = this.state;
    const { item } = this.props;

    return (
      <div className="element-inline">
        <FlatButton label="Edit" onClick={this.handleOpen} />
        <Dialog
          title="Edit Order"
          actions={actions}
          modal
          open={open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent
          contentClassName="orderModal"
        >
          <OrderForm item={item} onSubmit={this.handleEditData} onClose={this.handleClose} getActions={this.getActions} />
        </Dialog>
        <Snackbar
          open={feedback}
          message={isLoading ? <Loader className="m-t-5" size={35} thickness={3} /> : feedbackMsg}
          autoHideDuration={isLoading ? null : 2000}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    );
  }
}

