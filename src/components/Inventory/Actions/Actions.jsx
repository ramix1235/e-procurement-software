import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { deleteProduct, editProduct, addProduct } from '../../../redux/actions/productActions';
import { deleteCategory, editCategory, addCategory } from '../../../redux/actions/categoryActions';
import { deleteCurrency, editCurrency, addCurrency } from '../../../redux/actions/currencyActions';
import { deleteSupplier, editSupplier, addSupplier } from '../../../redux/actions/supplierActions';

import AddAction from './AddAction';
import DeleteAction from './DeleteAction';
import EditAction from './EditAction';

import { INVENTORY_TYPES } from '@constants/inventory';

export default class Actions extends Component {
  static propTypes = {
    activeType: PropTypes.string.isRequired,
    item: PropTypes.object,
  }

  static defaultProps = {
    item: undefined,
  }

  state = {
    deleteAction: () => null,
    editAction: () => null,
    addAction: () => null,
    form: null,
  }

  componentWillMount() {
    this.updateActionData();
  }

  componentDidUpdate(prevProps, prevState) {
    const { activeType } = this.props;

    if (prevProps.activeType !== activeType) {
      this.updateActionData();
    }
  }

  updateActionData = () => {
    const { activeType } = this.props;

    switch (activeType) {
      case INVENTORY_TYPES.CATEGORIES:
        this.setState({ addAction: addCategory, deleteAction: deleteCategory, editAction: editCategory });
        break;
      case INVENTORY_TYPES.CURRENCIES:
        this.setState({ addAction: addCurrency, deleteAction: deleteCurrency, editAction: editCurrency });
        break;
      case INVENTORY_TYPES.PRODUCTS:
        this.setState({ addAction: addProduct, deleteAction: deleteProduct, editAction: editProduct });
        break;
      case INVENTORY_TYPES.SUPPLIERS:
        this.setState({ addAction: addSupplier, deleteAction: deleteSupplier, editAction: editSupplier });
        break;
      default:
        break;
    }
  }

  render() {
    const { item, activeType } = this.props;
    const {
      addAction,
      deleteAction,
      editAction,
      form,
    } = this.state;

    return item ? (
      <Fragment>
        <DeleteAction item={item} activeType={activeType} action={deleteAction} />
        <EditAction item={item} activeType={activeType} action={editAction} form={form} />
      </Fragment>)
      : <AddAction activeType={activeType} action={addAction} form={form} />;
  }
}
