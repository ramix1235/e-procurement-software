import React from 'react';
import { TableRowColumn, TableHeaderColumn } from 'material-ui/Table';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';

exports.rows = (row, activeContent) => {
  const res = [];

  switch (activeContent.value) {
    case 'products':
      res.push(<TableRowColumn key={0}>{row.name}</TableRowColumn>);
      res.push(<TableRowColumn key={1}>{row.vendorCode}</TableRowColumn>);
      res.push(<TableRowColumn key={2}>{row.category.name}</TableRowColumn>);
      res.push(<TableRowColumn key={3}>{row.price}</TableRowColumn>);
      res.push(<TableRowColumn key={4}>{row.currency.name}</TableRowColumn>);
      break;
    case 'categories':
      res.push(<TableRowColumn key={0}>{row.name}</TableRowColumn>);
      break;
    case 'currencies':
      res.push(<TableRowColumn key={0}>{row.name}</TableRowColumn>);
      break;
    default: break;
  }
  return res;
};

exports.headerRows = (activeContent) => {
  const res = [];

  switch (activeContent.value) {
    case 'products':
      res.push(<TableHeaderColumn key={0} tooltip='The Name'>Name</TableHeaderColumn>);
      res.push(<TableHeaderColumn key={1} tooltip='The Vendor Code'>Vendor Code</TableHeaderColumn>);
      res.push(<TableHeaderColumn key={2} tooltip='The Category'>Category</TableHeaderColumn>);
      res.push(<TableHeaderColumn key={3} tooltip='The Price'>Price</TableHeaderColumn>);
      res.push(<TableHeaderColumn key={4} tooltip='The Currency'>Currency</TableHeaderColumn>);
      break;
    case 'categories':
      res.push(<TableHeaderColumn key={0} tooltip='The Name'>Name</TableHeaderColumn>);
      break;
    case 'currencies':
      res.push(<TableHeaderColumn key={0} tooltip='The Name'>Name</TableHeaderColumn>);
      break;
    default: break;
  }
  return res;
};

exports.menuItems = (activeContent) => {
  const res = [];

  switch (activeContent.value) {
    case 'products':
      res.push(<MenuItem value={0} key={0} primaryText={'Name'} />);
      res.push(<MenuItem value={1} key={1} primaryText={'Vendor Code'} />);
      res.push(<MenuItem value={2} key={2} primaryText={'Category'} />);
      res.push(<MenuItem value={3} key={3} primaryText={'Price'} />);
      res.push(<MenuItem value={4} key={4} primaryText={'Currency'} />);
      break;
    case 'categories':
      res.push(<MenuItem value={0} key={0} primaryText={'Name'} />);
      break;
    case 'currencies':
      res.push(<MenuItem value={0} key={0} primaryText={'Name'} />);
      break;
    default: break;
  }
  return res;
};

exports.filters = (arr, activeContent, filtering, searchBy) => {
  if (!filtering) return arr;

  switch (activeContent.value) {
    case 'products':
      return arr.filter(product => {
        let res = true;

        switch (searchBy) {
          case 0: res = product.name.match(new RegExp(filtering, 'i')); break;
          case 1: res = product.vendorCode.match(new RegExp(filtering, 'i')); break;
          case 3: res = product.price.toString().match(new RegExp(filtering, 'i')); break;
          case 2: res = product.category.name.match(new RegExp(filtering, 'i')); break;
          case 4: res = product.currency.name.match(new RegExp(filtering, 'i')); break;
          default: res = true;
        }
        return res;
      });
    case 'categories':
      return arr.filter(category => {
        let res = true;

        switch (searchBy) {
          case 0: res = category.name.match(new RegExp(filtering, 'i')); break;
          default: res = true;
        }
        return res;
      });
    case 'currencies':
      return arr.filter(currency => {
        let res = true;

        switch (searchBy) {
          case 0: res = currency.name.match(new RegExp(filtering, 'i')); break;
          default: res = true;
        }
        return res;
      });
    default: break;
  }
};

exports.addFields = (data, categoryBy, currencyBy, handleDropDownCategories, handleDropDownCurrencies) => {
  switch (data.activeContent.value) {
    case 'products': return getProductsField();
    case 'categories': return getCategoriesField();
    case 'currencies': return getCurrenciesField();
    default: break;
  }

  function getProductsField() {
    const categories = data.data.categories.map((item, i) => {
      return <MenuItem value={item._id} key={i} primaryText={item.name} />;
    });
    const currencies = data.data.currencies.map((item, i) => {
      return <MenuItem value={item._id} key={i} primaryText={item.name} />;
    });

    return (
      <div>
        <TextField
          // errorText='This field is required'
          floatingLabelText='Name'
          className='space-left-s'
          ref='nameField'
        />
        <br />
        <TextField
          // errorText='This field is required'
          floatingLabelText='Vendor Code'
          className='space-left-s'
          ref='vendorCodeField'
        />
        <br /><br />
        <DropDownMenu value={categoryBy} onChange={handleDropDownCategories}>
          {categories}
        </DropDownMenu>
        <br />
        <TextField
          // errorText='This field is required'
          floatingLabelText='Price'
          className='space-left-s'
          type='number'
          ref='priceField'
        />
        <DropDownMenu className='dropdown-xs' value={currencyBy} onChange={handleDropDownCurrencies}>
          {currencies}
        </DropDownMenu>
      </div>
    );
  }

  function getCategoriesField() {
    return (
      <div>
        <TextField
          // errorText='This field is required'
          floatingLabelText='Name'
          className='space-left-s'
        />
      </div>
    );
  }

  function getCurrenciesField() {
    return (
      <div>
        <TextField
          // errorText='This field is required'
          floatingLabelText='Name'
          className='space-left-s'
        />
      </div>
    );
  }
};