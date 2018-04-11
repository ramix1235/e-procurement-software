/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { editProduct } from '../../redux/actions/productActions';
import { editCategory } from '../../redux/actions/categoryActions';
import { editCurrency } from '../../redux/actions/currencyActions';
import { editSupplier } from '../../redux/actions/supplierActions';

import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import Dialog from 'material-ui/Dialog';
import { addFields, editItems } from '../rows';

@connect(state => ({
  products: state.products,
  categories: state.categories,
  currencies: state.currencies,
  suppliers: state.suppliers,
}))
export default class EditItem extends Component {
  static propTypes = {
    categories: PropTypes.array.isRequired,
    currencies: PropTypes.array.isRequired,
    products: PropTypes.array.isRequired,
    suppliers: PropTypes.array.isRequired,
    activeContent: PropTypes.object,
    currentItem: PropTypes.object,
    data: PropTypes.object,
    editCategory: PropTypes.func,
    editCurrency: PropTypes.func,
    editProduct: PropTypes.func,
    editSupplier: PropTypes.func,
  }

  static defaultProps = {
    data: {},
    activeContent: {},
    currentItem: {},
    editProduct,
    editCategory,
    editCurrency,
    editSupplier,
  }

  state = {
    open: false,
    itemData: {
      categoryBy: this.props.currentItem.category ? this.props.currentItem.category._id : null,
      currencyBy: this.props.currentItem.currency ? this.props.currentItem.currency._id : null,
    },
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

  handleDropDownCategories = (event, index, value) => {
    this.setState({ itemData: { categoryBy: value, currencyBy: this.state.itemData.currencyBy } });
  };

  handleDropDownCurrencies = (event, index, value) => {
    this.setState({ itemData: { categoryBy: this.state.itemData.categoryBy, currencyBy: value } });
  };

  handleEditData = () => {
    editItems(this);
    this.setState({ open: false });
  }

  render() {
    const {
      open,
      feedback,
      feedbackMsg,
      itemData,
    } = this.state;
    const {
      activeContent,
      data,
      currentItem,
    } = this.props;
    const actions = [
      <FlatButton
        key={0}
        label="Ok"
        primary
        // disabled
        onClick={this.handleEditData}
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
        <FlatButton label="Edit" onClick={this.handleOpen} />
        <Dialog
          title={`Edit ${activeContent.single}`}
          actions={actions}
          modal
          open={open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent
        >
          {addFields(
            data,
            itemData,
            {
              handleDropDownCategories: this.handleDropDownCategories,
              handleDropDownCurrencies: this.handleDropDownCurrencies,
            },
            currentItem
          )}
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

