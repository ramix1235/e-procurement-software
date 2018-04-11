/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addProduct } from '../../redux/actions/productActions';
import { addCategory } from '../../redux/actions/categoryActions';
import { addCurrency } from '../../redux/actions/currencyActions';
import { addSupplier } from '../../redux/actions/supplierActions';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import { addFields, addItems } from '../rows';

@connect(state => ({
  products: state.products,
  categories: state.categories,
  currencies: state.currencies,
  suppliers: state.suppliers,
}))
export default class AddItem extends Component {
  static propTypes = {
    categories: PropTypes.array.isRequired,
    currencies: PropTypes.array.isRequired,
    products: PropTypes.array.isRequired,
    suppliers: PropTypes.array.isRequired,
    activeContent: PropTypes.object,
    addCategory: PropTypes.func,
    addCurrency: PropTypes.func,
    addProduct: PropTypes.func,
    addSupplier: PropTypes.func,
    data: PropTypes.object,
  }

  static defaultProps = {
    data: {},
    activeContent: {},
    addProduct,
    addCategory,
    addCurrency,
    addSupplier,
  }

  state = {
    open: false,
    itemData: {
      categoryBy: null,
      currencyBy: null,
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

  handleSaveData = () => {
    addItems(this);
    this.setState({ open: false });
  }

  handleDropDownCategories = (event, index, value) => {
    const { itemData: { currencyBy } } = this.state;

    this.setState({ itemData: { categoryBy: value, currencyBy } });
  };

  handleDropDownCurrencies = (event, index, value) => {
    const { itemData: { categoryBy } } = this.state;

    this.setState({ itemData: { categoryBy, currencyBy: value } });
  };

  render() {
    const {
      open,
      itemData,
      feedback,
      feedbackMsg,
    } = this.state;
    const {
      activeContent,
    } = this.props;
    const actions = [
      <FlatButton
        key={0}
        label="Ok"
        primary
        // disabled
        onClick={this.handleSaveData}
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
        <RaisedButton label={`Add ${activeContent.single}`} onClick={this.handleOpen} />
        <Dialog
          title={`Add ${activeContent.single}`}
          actions={actions}
          modal
          open={open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent
        >
          {addFields(
            this.props,
            itemData,
            {
              handleDropDownCategories: this.handleDropDownCategories,
              handleDropDownCurrencies: this.handleDropDownCurrencies,
            },
            null
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
