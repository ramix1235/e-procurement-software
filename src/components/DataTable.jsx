import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProducts  } from '../redux/actions/productActions';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
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
  loadProducts: PropTypes.func
};

const defaultProps = {
  products: []
};

class DataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fixedHeader: true,
      fixedFooter: false,
      stripedRows: false,
      showRowHover: true,
      selectable: false,
      multiSelectable: false,
      enableSelectAll: false,
      deselectOnClickaway: true,
      showCheckboxes: false,
      height: '300px',
      filtering: null,
      searchBy: 0
    };
  }

  componentDidMount() {
    this.props.loadProducts();
  }

  handleDataTable = (event, index, value) => {
    this.setState({ filtering: event.target.value });
  }

  handleDropDown = (event, index, value) => {
    console.log(value);
    this.setState({ searchBy: value });
  }

  render() {
    return (
      <div>
        <DropDownMenu className='space-top-s' value={this.state.searchBy} onChange={this.handleDropDown}>
          <MenuItem value={0} primaryText={'Name'} />
          <MenuItem value={1} primaryText={'Vendor Code'} />
          <MenuItem value={2} primaryText={'Category'} />
          <MenuItem value={3} primaryText={'Price'} />
        </DropDownMenu>
        <br/>
        <TextField className='space-left-s' hintText='Search' onChange={this.handleDataTable}/>
        <Table
          height={this.state.height}
          fixedHeader={this.state.fixedHeader}
          fixedFooter={this.state.fixedFooter}
          selectable={this.state.selectable}
          multiSelectable={this.state.multiSelectable}
        >
          <TableHeader
            displaySelectAll={this.state.showCheckboxes}
            adjustForCheckbox={this.state.showCheckboxes}
            enableSelectAll={this.state.enableSelectAll}
          >
            <TableRow>
              <TableHeaderColumn colSpan='6' tooltip='Products' style={{ textAlign: 'center' }}>
                Products
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn tooltip='The ID'>ID</TableHeaderColumn>
              <TableHeaderColumn tooltip='The Name'>Name</TableHeaderColumn>
              <TableHeaderColumn tooltip='The Vendor Code'>Vendor Code</TableHeaderColumn>
              <TableHeaderColumn tooltip='The Category'>Category</TableHeaderColumn>
              <TableHeaderColumn tooltip='The Price'>Price</TableHeaderColumn>
              <TableHeaderColumn tooltip='The Actions'>Actions</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={this.state.showCheckboxes}
            deselectOnClickaway={this.state.deselectOnClickaway}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}
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
                  <TableRowColumn>
                    <FlatButton label='Add'/><br/>
                    <FlatButton label='Edit'/><br/>
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
    products: state.products
  }),
  dispatch => ({
    loadProducts: () => dispatch(getProducts())
  })
)(DataTable);