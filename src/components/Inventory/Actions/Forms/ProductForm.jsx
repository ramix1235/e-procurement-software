/* eslint-disable no-underscore-dangle */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cloneDeep from 'lodash/cloneDeep';

import { getCategories } from '../../../../redux/actions/categoryActions';
import { getCurrencies } from '../../../../redux/actions/currencyActions';
import { getSuppliers } from '../../../../redux/actions/supplierActions';

import {
  TextField,
  DropDownMenu,
  MenuItem,
  Drawer,
  List,
  Subheader,
  Divider,
  ListItem,
  Checkbox,
  FlatButton,
} from 'material-ui';

@connect(state => ({
  categories: state.categories,
  currencies: state.currencies,
  suppliers: state.suppliers,
}))
export default class ProductForm extends Component {
  static propTypes = {
    categories: PropTypes.array.isRequired,
    currencies: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
    getActions: PropTypes.func.isRequired,
    suppliers: PropTypes.array.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    item: PropTypes.object,
  }

  static defaultProps = {
    item: {
      _id: null,
      name: '',
      vendorCode: '',
      category: '',
      currency: '',
      suppliers: [],
    },
  }

  state = {
    categoryBy: this.props.item.category._id,
    currencyBy: this.props.item.currency._id,
    checkedSuppliers: [],
  }

  componentWillMount() {
    const {
      dispatch,
      getActions,
      onClose,
      item,
    } = this.props;
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
    dispatch(getCategories());
    dispatch(getCurrencies());
    dispatch(getSuppliers())
      .then((suppliers) => {
        const checked = suppliers.filter((supplier, index) => (
          item.suppliers.find(obj => obj.supplier._id === supplier._id)
        ));

        if (checked.length > 0) {
          this.setState(prevState => ({
            checkedSuppliers: [...prevState.checkedSuppliers, ...checked],
          }));
        }
      });
  }

  handleDropDownCategories = (event, index, value) => {
    const { currencyBy } = this.state;

    this.setState({ categoryBy: value, currencyBy });
  }

  handleDropDownCurrencies = (event, index, value) => {
    const { categoryBy } = this.state;

    this.setState({ categoryBy, currencyBy: value });
  }

  handleSubmitClick = () => {
    const { onSubmit, item } = this.props;
    const { currencyBy, categoryBy, checkedSuppliers } = this.state;

    const formattedCheckedSuppliers = checkedSuppliers
      .map((supplier) => {
        const productIndex = supplier.products.findIndex(obj => obj.product._id === item._id);

        return {
          supplier: supplier._id,
          price: supplier.products.length > 0 ? parseFloat(supplier.products[productIndex].price) : 0,
        };
      });

    const model = {
      _id: item._id,
      name: this.nameField.input.value,
      vendorCode: this.vendorCodeField.input.value,
      category: categoryBy,
      currency: currencyBy,
      suppliers: formattedCheckedSuppliers,
    };

    onSubmit(model);
  }

  handleCheckBoxCheck = (e, isInputChecked, checkedSupplier, formProduct) => {
    const { checkedSuppliers } = this.state;
    const temporaryCheckedSuppliers = cloneDeep(checkedSuppliers);

    if (isInputChecked) {
      const productModel = {
        product: formProduct,
        price: 0,
      };

      const existedFormProductIndex = checkedSupplier.products.findIndex(obj => obj.product._id === formProduct._id);

      if (existedFormProductIndex >= 0) {
        checkedSupplier.products.splice(existedFormProductIndex, 1);
      }

      checkedSupplier.products.push(productModel);

      this.setState(prevState => ({
        checkedSuppliers: [...prevState.checkedSuppliers, checkedSupplier],
      }));
      return;
    }


    const checkedSupplierIndex = temporaryCheckedSuppliers.findIndex(obj => obj._id === checkedSupplier._id);

    temporaryCheckedSuppliers.splice(checkedSupplierIndex, 1);

    this.setState({
      checkedSuppliers: temporaryCheckedSuppliers,
    });
  }

  handlePriceFieldChange = (e, checkedSupplier, formProduct) => {
    const { checkedSuppliers } = this.state;
    const { target: { value } } = e;
    const temporaryCheckedSuppliers = cloneDeep(checkedSuppliers);
    let number = value;
    const numberWithTwoDecimal = /^\d+\.?\d{0,2}$/;
    const numberWithLeadNull = /^0\d+$/;

    if (!number) number = '0';
    if (!number.match(numberWithTwoDecimal)) return;
    if (number.match(numberWithLeadNull)) number = number.substring(1);

    const checkedSupplierIndex = temporaryCheckedSuppliers.findIndex(obj => obj._id === checkedSupplier._id);

    if (formProduct._id) {
      const productIndex = temporaryCheckedSuppliers[checkedSupplierIndex].products.findIndex(obj => obj.product._id === formProduct._id);

      temporaryCheckedSuppliers[checkedSupplierIndex].products[productIndex].price = number;
    } else {
      const emptyProductIndex = temporaryCheckedSuppliers[checkedSupplierIndex].products.findIndex(obj => obj.product._id === null);

      temporaryCheckedSuppliers[checkedSupplierIndex].products[emptyProductIndex].price = number;
    }

    this.setState({
      checkedSuppliers: temporaryCheckedSuppliers,
    });
  }

  updateFormData = () => {
    const { dispatch } = this.props;

    dispatch(getCategories());
    dispatch(getCurrencies());
    dispatch(getSuppliers());
  }

  render() {
    const {
      item,
      categories,
      currencies,
      suppliers,
    } = this.props;
    const { categoryBy, currencyBy } = this.state;
    const { checkedSuppliers } = this.state;

    return (
      <Fragment>
        <TextField
          ref={(ref) => { this.nameField = ref; }}
          floatingLabelText="Name"
          className="space-left-s"
          defaultValue={item.name}
        />
        <br />
        <TextField
          ref={(ref) => { this.vendorCodeField = ref; }}
          floatingLabelText="Vendor Code"
          className="space-left-s"
          defaultValue={item.vendorCode}
        />
        <br /><br />
        <DropDownMenu value={categoryBy} onChange={this.handleDropDownCategories}>
          {categories.map((category, idx) => (
            <MenuItem key={`category-${idx}`} value={category._id} primaryText={category.name} />
          ))}
        </DropDownMenu>
        <br />
        <DropDownMenu className="dropdown-xs" value={currencyBy} onChange={this.handleDropDownCurrencies}>
          {currencies.map((currency, idx) => (
            <MenuItem key={`currency-${idx}`} value={currency._id} primaryText={currency.name} />
          ))}
        </DropDownMenu>
        <br />
        <Drawer open={false}>
          <List>
            <Subheader>Suppliers</Subheader>
            {suppliers.map((supplier, index) => {
              let checkedSupplierProduct = null;
              const checkedSupplierIndex = checkedSuppliers.findIndex(obj => obj._id === supplier._id);

              if (checkedSupplierIndex >= 0) {
                const productIndex = checkedSuppliers[checkedSupplierIndex].products.findIndex(obj => obj.product._id === item._id);

                checkedSupplierProduct = checkedSuppliers[checkedSupplierIndex].products[productIndex];
              }

              return (
                <Fragment key={`supplier-${index}`}>
                  <Divider />
                  <ListItem
                    leftCheckbox={
                      <Checkbox
                        defaultChecked={!!checkedSupplierProduct}
                        onCheck={(e, isInputChecked) => this.handleCheckBoxCheck(e, isInputChecked, supplier, item)}
                      />
                    }
                    primaryText={supplier.name}
                    secondaryTextLines={2}
                    secondaryText={
                      <TextField
                        className="nestedField"
                        disabled={!checkedSupplierProduct}
                        defaultValue={0}
                        value={checkedSupplierProduct ? checkedSupplierProduct.price : 0}
                        onChange={e => this.handlePriceFieldChange(e, supplier, item)}
                      />
                    }
                  />
                </Fragment>
              );
            })}
          </List>
        </Drawer>
      </Fragment>
    );
  }
}
