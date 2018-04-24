/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { deleteOrder } from '../../../redux/actions/orderActions';

import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import Dialog from 'material-ui/Dialog';
import Loader from '../../containers/Loader';

@connect()
export default class DeleteAction extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
  }

  state = {
    open: false,
    feedback: false,
    feedbackMsg: 'Complete!',
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

  handleDeleteData = () => {
    const { item, dispatch } = this.props;

    const deletingModel = {
      _id: item._id,
    };

    this.setState({ feedback: true, isLoading: true });
    // Can't call setState (or forceUpdate) on an unmounted component.
    dispatch(deleteOrder(deletingModel))
      .then(response => this.setState({ feedbackMsg: 'Complete!' }))
      .catch((err) => {
        if (err) this.setState({ feedbackMsg: 'Failed!' });
      })
      .finally(() => this.setState({ open: false, isLoading: false }));
  }

  render() {
    const {
      open,
      feedback,
      feedbackMsg,
      isLoading,
    } = this.state;
    const { item } = this.props;
    const actions = [
      <FlatButton
        key={0}
        label="Ok"
        primary
        onClick={this.handleDeleteData}
      />,
      <FlatButton
        key={1}
        label="Discard"
        primary
        onClick={this.handleClose}
      />,
    ];

    return (
      <div className="element-inline">
        <FlatButton label="Delete" onClick={this.handleOpen} />
        <Dialog
          title="Delete Order"
          actions={actions}
          modal
          open={open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent
        >
          <span>Are you sure that you want to delete {item.name}?</span>
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
