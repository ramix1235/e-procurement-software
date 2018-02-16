import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';

const propTypes = {
  categories: PropTypes.array,
  currencies: PropTypes.array
};

const defaultProps = {
  categories: [],
  currencies: []
};

export default class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      categoryBy: 0,
      currencyBy: 0
    };
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleDropDownCategories = (event, index, value) => {
    this.setState({ categoryBy: value });
  };

  handleDropDownCurrencies = (event, index, value) => {
    this.setState({ currencyBy: value });
  };

  render() {
    const actions = [
      <FlatButton
        label='Ok'
        key={0}
        primary
        // disabled
        onClick={this.handleClose}
      />,
      <FlatButton
        label='Discard'
        key={1}
        primary
        onClick={this.handleClose}
      />
    ];
    const categories = this.props.categories.map((item, i) => {
      return <MenuItem value={i} key={i} primaryText={item.name} />;
    });
    const currencies = this.props.currencies.map((item, i) => {
      return <MenuItem value={i} key={i} primaryText={item.name} />;
    });

    return (
      <div className='element-inline'>
        <RaisedButton label='Add Item' onClick={this.handleOpen} />
        <Dialog
          title='Add Item'
          actions={actions}
          modal
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent
        >
          <TextField
            // errorText='This field is required'
            floatingLabelText='Name'
            className='space-left-s'
          />
          <br />
          <TextField
            // errorText='This field is required'
            floatingLabelText='Vendor Code'
            className='space-left-s'
          />
          <br /><br />
          <DropDownMenu value={this.state.categoryBy} onChange={this.handleDropDownCategories}>
            {categories}
          </DropDownMenu>
          <br />
          <TextField
            // errorText='This field is required'
            floatingLabelText='Price'
            className='space-left-s'
            type='number'
          />
          <DropDownMenu className='dropdown-xs' value={this.state.currencyBy} onChange={this.handleDropDownCurrencies}>
            {currencies}
          </DropDownMenu>
        </Dialog>
      </div>
    );
  }
}

AddProduct.propTypes = propTypes;
AddProduct.defaultProps = defaultProps;