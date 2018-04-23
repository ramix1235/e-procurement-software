/* eslint-disable no-underscore-dangle */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cloneDeep from 'lodash/cloneDeep';

import { getProducts } from '../../../../redux/actions/productActions';

import {
  TextField,
  Drawer,
  List,
  Subheader,
  Divider,
  ListItem,
  Checkbox,
  FlatButton,
} from 'material-ui';

@connect(state => ({
  products: state.products,
}))
export default class ProductForm extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    getActions: PropTypes.func.isRequired,
    products: PropTypes.array.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    item: PropTypes.object,
  }


  static defaultProps = {
    item: {
      _id: null,
      name: '',
      address: '',
      telephone: '',
      products: [],
    },
  }

  state = {
    checkedProducts: [],
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
    dispatch(getProducts())
      .then((products) => {
        const checked = products.filter((product, index) => (
          item.products.find(obj => obj.product._id === product._id)
        ));

        if (checked.length > 0) {
          this.setState(prevState => ({
            checkedProducts: [...prevState.checkedProducts, ...checked],
          }));
        }
      });
  }

  handleSubmitClick = () => {
    const { onSubmit, item } = this.props;
    const { checkedProducts } = this.state;

    const formattedCheckedProducts = checkedProducts
      .map((product) => {
        const supplierIndex = product.suppliers.findIndex(obj => obj.supplier._id === item._id);

        return {
          product: product._id,
          price: product.suppliers.length > 0 ? parseFloat(product.suppliers[supplierIndex].price) : 0,
        };
      });

    const model = {
      _id: item._id,
      name: this.nameField.input.value,
      address: this.addressField.input.value,
      telephone: this.telephoneField.input.value,
      products: formattedCheckedProducts,
    };

    onSubmit(model);
  }

  handleCheckBoxCheck = (e, isInputChecked, checkedProduct, formSupplier) => {
    const { checkedProducts } = this.state;
    const temporaryCheckedProducts = cloneDeep(checkedProducts);

    if (isInputChecked) {
      const supplierModel = {
        supplier: formSupplier,
        price: 0,
      };

      const existedFormSupplierIndex = checkedProduct.suppliers.findIndex(obj => obj.supplier._id === formSupplier._id);

      if (existedFormSupplierIndex >= 0) {
        checkedProduct.suppliers.splice(existedFormSupplierIndex, 1);
      }

      checkedProduct.suppliers.push(supplierModel);

      this.setState(prevState => ({
        checkedProducts: [...prevState.checkedProducts, checkedProduct],
      }));
      return;
    }

    const checkedProductIndex = temporaryCheckedProducts.findIndex(obj => obj._id === checkedProduct._id);

    temporaryCheckedProducts.splice(checkedProductIndex, 1);

    this.setState({
      checkedProducts: temporaryCheckedProducts,
    });
  }

  handlePriceFieldChange = (e, checkedProduct, formSupplier) => {
    const { checkedProducts } = this.state;
    const { target: { value } } = e;
    const temporaryCheckedProducts = cloneDeep(checkedProducts);
    let number = value;
    const numberWithTwoDecimal = /^\d+\.?\d{0,2}$/;
    const numberWithLeadNull = /^0\d+$/;

    if (!number) number = '0';
    if (!number.match(numberWithTwoDecimal)) return;
    if (number.match(numberWithLeadNull)) number = number.substring(1);

    const checkedProductIndex = temporaryCheckedProducts.findIndex(obj => obj._id === checkedProduct._id);

    if (formSupplier._id) {
      // const checkedProductIndex = temporaryCheckedProducts.findIndex(obj => obj._id === checkedProductSupplier.product._id);
      const supplierIndex = temporaryCheckedProducts[checkedProductIndex].suppliers.findIndex(obj => obj.supplier._id === formSupplier._id);

      temporaryCheckedProducts[checkedProductIndex].suppliers[supplierIndex].price = number;
    } else {
      const emptySupplierIndex = temporaryCheckedProducts[checkedProductIndex].suppliers.findIndex(obj => obj.supplier._id === null);

      temporaryCheckedProducts[checkedProductIndex].suppliers[emptySupplierIndex].price = number;
    }

    this.setState({
      checkedProducts: temporaryCheckedProducts,
    });
  }

  updateFormData = () => {
    const { dispatch } = this.props;

    dispatch(getProducts());
  }

  render() {
    const {
      item,
      products,
    } = this.props;
    const { checkedProducts } = this.state;

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
          ref={(ref) => { this.addressField = ref; }}
          floatingLabelText="Address"
          className="space-left-s"
          defaultValue={item.address}
        />
        <br />
        <TextField
          ref={(ref) => { this.telephoneField = ref; }}
          floatingLabelText="Telephone"
          className="space-left-s"
          defaultValue={item.telephone}
        />
        <br />
        <Drawer open={false}>
          <List>
            <Subheader>Products</Subheader>
            {products.map((product, index) => {
              let checkedProductSupplier = null;
              const checkedProductIndex = checkedProducts.findIndex(obj => obj._id === product._id);

              if (checkedProductIndex >= 0) {
                const supplierIndex = checkedProducts[checkedProductIndex].suppliers.findIndex(obj => obj.supplier._id === item._id);

                checkedProductSupplier = checkedProducts[checkedProductIndex].suppliers[supplierIndex];
              }

              return (
                <Fragment key={`product-${index}`}>
                  <Divider />
                  <ListItem
                    leftCheckbox={
                      <Checkbox
                        defaultChecked={!!checkedProductSupplier}
                        onCheck={(e, isInputChecked) => this.handleCheckBoxCheck(e, isInputChecked, product, item)}
                      />
                    }
                    primaryText={product.name}
                    secondaryTextLines={2}
                    secondaryText={
                      <TextField
                        className="nestedField"
                        disabled={!checkedProductSupplier}
                        defaultValue={0}
                        value={checkedProductSupplier ? checkedProductSupplier.price : 0}

                        onChange={e => this.handlePriceFieldChange(e, product, item)}
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
