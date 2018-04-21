/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
// import pluralize from 'pluralize';

import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import Dialog from 'material-ui/Dialog';
import ProductForm from './Forms/ProductForm';
import CategoryForm from './Forms/CategoryForm';
import CurrencyForm from './Forms/CurrencyForm';
import SupplierForm from './Forms/SupplierForm';
import Loader from '../../containers/Loader';

import { INVENTORY_TYPES } from '@constants/inventory';

@connect()
export default class EditAction extends Component {
  static propTypes = {
    action: PropTypes.func.isRequired,
    activeType: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
  }

  state = {
    open: false,
    feedback: false,
    feedbackMsg: 'Complete!',
    form: null,
    actions: [],
    isLoading: false,
  }

  componentWillMount() {
    this.updateFormType();
  }

  componentDidUpdate(prevProps, prevState) {
    const { item } = this.props;

    if (
      !isEqual(item, prevProps.item)
    ) {
      this.updateFormType();
    }
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
    const { dispatch, action } = this.props;

    this.setState({ feedback: true, isLoading: true });
    dispatch(action(editingModel))
      .then(response => this.setState({ feedbackMsg: 'Complete!' }))
      .catch((err) => {
        if (err) this.setState({ feedbackMsg: 'Failed!' });
      })
      .finally(() => this.setState({ open: false, isLoading: false }));
  }

  getActions = (actions) => {
    this.setState({ actions });
  }

  updateFormType = () => {
    const { item, activeType } = this.props;

    switch (activeType) {
      case INVENTORY_TYPES.CATEGORIES:
        this.setState({ form: <CategoryForm item={item} onSubmit={this.handleEditData} onClose={this.handleClose} getActions={this.getActions} /> });
        break;
      case INVENTORY_TYPES.CURRENCIES:
        this.setState({ form: <CurrencyForm item={item} onSubmit={this.handleEditData} onClose={this.handleClose} getActions={this.getActions} /> });
        break;
      case INVENTORY_TYPES.PRODUCTS:
        this.setState({ form: <ProductForm item={item} onSubmit={this.handleEditData} onClose={this.handleClose} getActions={this.getActions} /> });
        break;
      case INVENTORY_TYPES.SUPPLIERS:
        this.setState({ form: <SupplierForm item={item} onSubmit={this.handleEditData} onClose={this.handleClose} getActions={this.getActions} /> });
        break;
      default:
        break;
    }
  }

  render() {
    const {
      open,
      feedback,
      feedbackMsg,
      form,
      actions,
      isLoading,
    } = this.state;
    const { activeType } = this.props;

    return (
      <div className="element-inline">
        <FlatButton label="Edit" onClick={this.handleOpen} />
        <Dialog
          // title={`Edit ${pluralize(activeType, 1)}`}
          title={`Edit ${activeType}`}
          actions={actions}
          modal
          open={open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent
        >
          {form}
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

