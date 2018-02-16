import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProducts  } from '../redux/actions/productActions';
import { getCategories  } from '../redux/actions/categoryActions';
import { getCurrencies  } from '../redux/actions/currencyActions';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import AddProduct from './Products/AddProduct';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';

const propTypes = {
  products: PropTypes.array,
  loadProducts: PropTypes.func,
  categories: PropTypes.array,
  loadCategories: PropTypes.func,
  currencies: PropTypes.array,
  loadCurrencies: PropTypes.func
};

const defaultProps = {
  products: [],
  categories: [],
  currencies: []
};

class DataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filtering: null,
      searchBy: 0
    };
  }

  componentDidMount() {
    this.props.loadProducts();
    this.props.loadCategories();
    this.props.loadCurrencies();
  }

  handleDataTable = (event, index, value) => {
    this.setState({ filtering: event.target.value });
  }

  handleDropDown = (event, index, value) => {
    this.setState({ searchBy: value });
  }

  render() {
    return (
      <div>
        <DropDownMenu className='dropdown-s' value={this.state.searchBy} onChange={this.handleDropDown}>
          <MenuItem value={0} key={0} primaryText={'Name'} />
          <MenuItem value={1} key={1} primaryText={'Vendor Code'} />
          <MenuItem value={2} key={2} primaryText={'Category'} />
          <MenuItem value={3} key={3} primaryText={'Price'} />
          <MenuItem value={4} key={4} primaryText={'Currency'} />
        </DropDownMenu>
        <TextField className='space-left-s' hintText='Search' onChange={this.handleDataTable}/>
        <RadioButtonGroup name='Views' defaultSelected='products' className='radio-group space-top-s space-left-xs2'>
          <RadioButton
            value='products'
            label='Products'
          />
          <RadioButton
            value='categories'
            label='Categories'
            className='radio-btn'
          />
          <RadioButton
            value='currencies'
            label='Currencies'
            className='radio-btn'
          />
          <RadioButton
            value='suppliers'
            label='Suppliers'
            disabled
            className='radio-btn'
          />
        </RadioButtonGroup>
        <div className='right'>
          <AddProduct categories={this.props.categories} currencies={this.props.currencies}/>
          <RaisedButton className='space-left-s' label='History changes' disabled/>
        </div>
        <Table
          className='space-top-s'
          height={'300px'}
          fixedHeader
          fixedFooter={false}
          selectable={false}
          multiSelectable={false}
        >
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
            enableSelectAll={false}
          >
            <TableRow>
              <TableHeaderColumn tooltip='The ID'>ID</TableHeaderColumn>
              <TableHeaderColumn tooltip='The Name'>Name</TableHeaderColumn>
              <TableHeaderColumn tooltip='The Vendor Code'>Vendor Code</TableHeaderColumn>
              <TableHeaderColumn tooltip='The Category'>Category</TableHeaderColumn>
              <TableHeaderColumn tooltip='The Price'>Price</TableHeaderColumn>
              <TableHeaderColumn tooltip='The Currency'>Currency</TableHeaderColumn>
              <TableHeaderColumn tooltip='The Actions'>Actions</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
            deselectOnClickaway
            showRowHover
            stripedRows={false}
          >
            {this.props.products
              .filter(item => {
                let res = true;

                if (this.state.filtering) {
                  switch (this.state.searchBy) {
                    case 0: res = item.name.match(new RegExp(this.state.filtering, 'i')); break;
                    case 1: res = item.vendor_code.match(new RegExp(this.state.filtering, 'i')); break;
                    case 3: res = item.price.toString().match(new RegExp(this.state.filtering, 'i')); break;
                    case 2: res = item.category.name.match(new RegExp(this.state.filtering, 'i')); break;
                    case 4: res = item.currency.name.match(new RegExp(this.state.filtering, 'i')); break;
                    default: res = true;
                  }
                }
                return res;
              })
              .map((row, index) => (
                <TableRow key={index}>
                  <TableRowColumn>{index}</TableRowColumn>
                  <TableRowColumn>{row.name}</TableRowColumn>
                  <TableRowColumn>{row.vendor_code}</TableRowColumn>
                  <TableRowColumn>{row.category.name}</TableRowColumn>
                  <TableRowColumn>{row.price}</TableRowColumn>
                  <TableRowColumn>{row.currency.name}</TableRowColumn>
                  <TableRowColumn>
                    <FlatButton label='Edit'/>
                    <FlatButton label='Delete'/>
                  </TableRowColumn>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

DataTable.propTypes = propTypes;
DataTable.defaultProps = defaultProps;

export default connect(
  state => ({
    products: state.products,
    categories: state.categories,
    currencies: state.currencies
  }),
  dispatch => ({
    loadProducts: () => dispatch(getProducts()),
    loadCategories: () => dispatch(getCategories()),
    loadCurrencies: () => dispatch(getCurrencies())
  })
)(DataTable);