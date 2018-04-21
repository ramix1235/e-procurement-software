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
      price: 0,
      currency: '',
      suppliers: [],
    },
  }

  state = {
    categoryBy: this.props.item.category._id,
    currencyBy: this.props.item.currency._id,
    checkedItems: [],
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
          item.suppliers.find(currSupplier => supplier._id === currSupplier._id)
        ));

        if (checked.length > 0) {
          this.setState(prevState => ({
            checkedItems: [...prevState.checkedItems, ...checked],
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
    const { currencyBy, categoryBy, checkedItems } = this.state;

    const model = {
      _id: item._id,
      name: this.nameField.input.value,
      vendorCode: this.vendorCodeField.input.value,
      category: categoryBy,
      price: +this.priceField.input.value,
      currency: currencyBy,
      suppliers: checkedItems,
    };

    onSubmit(model);
  }

  handleCheckBoxCheck = (e, isInputChecked, item) => {
    const { checkedItems } = this.state;
    const temporaryCheckedItems = cloneDeep(checkedItems);
    const itemIndex = temporaryCheckedItems.findIndex(obj => obj._id === item._id);

    if (isInputChecked) {
      this.setState(prevState => ({
        checkedItems: [...prevState.checkedItems, item],
      }));
      return;
    }

    temporaryCheckedItems.splice(itemIndex, 1);

    this.setState({
      checkedItems: temporaryCheckedItems,
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
        <TextField
          ref={(ref) => { this.priceField = ref; }}
          floatingLabelText="Price"
          className="space-left-s"
          type="number"
          defaultValue={item.price}
        />
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
              const checkedProduct = item.suppliers.find(currSupplier => supplier._id === currSupplier._id);

              return (
                <Fragment key={`supplier-${index}`}>
                  <Divider />
                  <ListItem
                    leftCheckbox={<Checkbox defaultChecked={!!checkedProduct} onCheck={(e, isInputChecked) => this.handleCheckBoxCheck(e, isInputChecked, supplier)} />}
                    primaryText={supplier.name}
                    secondaryText={supplier.telephone}
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
