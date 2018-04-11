import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { deleteProduct } from '../../redux/actions/productActions';
import { deleteCategory } from '../../redux/actions/categoryActions';
import { deleteCurrency } from '../../redux/actions/currencyActions';
import { deleteSupplier } from '../../redux/actions/supplierActions';

import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import Dialog from 'material-ui/Dialog';
import { deleteItems } from '../rows';

@connect(state => ({
  products: state.products,
  categories: state.categories,
  currencies: state.currencies,
  suppliers: state.suppliers,
}))
export default class DeleteItem extends Component {
  static propTypes = {
    categories: PropTypes.array.isRequired,
    currencies: PropTypes.array.isRequired,
    products: PropTypes.array.isRequired,
    suppliers: PropTypes.array.isRequired,
    activeContent: PropTypes.object,
    data: PropTypes.object,
    deleteCategory: PropTypes.func,
    deleteCurrency: PropTypes.func,
    deleteProduct: PropTypes.func,
    deleteSupplier: PropTypes.func,
  }

  static defaultProps = {
    data: {},
    activeContent: {},
    deleteProduct,
    deleteCategory,
    deleteCurrency,
    deleteSupplier,
  }

  state = {
    open: false,
    feedback: false,
    feedbackMsg: 'Complete!',
  }


  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleRequestClose = () => {
    this.setState({ feedback: false });
  }

  handleDeleteData = () => {
    deleteItems(this);
    this.setState({ open: false });
  }

  render() {
    const { open, feedback, feedbackMsg } = this.state;
    const { activeContent, data } = this.props;
    const actions = [
      <FlatButton
        key={0}
        label="Ok"
        primary
        // disabled
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
          title={`Delete ${activeContent.single}`}
          actions={actions}
          modal
          open={open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent
        >
          <span>Are you sure that you want to delete {data.name}?</span>
        </Dialog>
        <Snackbar
          open={feedback}
          message={feedbackMsg}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    );
  }
}
