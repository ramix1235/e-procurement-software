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
    dispatch(getProducts())
      .then((products) => {
        const checked = products.filter((product, index) => (
          item.products.find(currProduct => product._id === currProduct._id)
        ));

        if (checked.length > 0) {
          this.setState(prevState => ({
            checkedItems: [...prevState.checkedItems, ...checked],
          }));
        }
      });
  }

  handleSubmitClick = () => {
    const { onSubmit, item } = this.props;
    const { checkedItems } = this.state;

    const model = {
      _id: item._id,
      name: this.nameField.input.value,
      address: this.addressField.input.value,
      telephone: +this.telephoneField.input.value,
      products: checkedItems,
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

    dispatch(getProducts());
  }

  render() {
    const {
      item,
      products,
    } = this.props;

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
          type="number"
          defaultValue={item.telephone}
        />
        <br />
        <Drawer open={false}>
          <List>
            <Subheader>Products</Subheader>
            {products.map((product, index) => {
              const checkedSupplier = item.products.find(currProduct => product._id === currProduct._id);

              return (
                <Fragment key={`product-${index}`}>
                  <Divider />
                  <ListItem
                    leftCheckbox={<Checkbox defaultChecked={!!checkedSupplier} onCheck={(e, isInputChecked) => this.handleCheckBoxCheck(e, isInputChecked, product)} />}
                    primaryText={product.name}
                    secondaryText={product.telephone}
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
