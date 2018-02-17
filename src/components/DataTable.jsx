import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import AddItem from './AddItem';
import { rows, headerRows, menuItems, filters } from './rows';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';

const propTypes = {
  data: PropTypes.object,
  activeContent: PropTypes.object
};

export default class DataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filtering: null,
      searchBy: 0
    };
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
          {menuItems(this.props.activeContent)}
        </DropDownMenu>
        <TextField className='space-left-s' hintText='Search' onChange={this.handleDataTable}/>
        <div className='right'>
          <AddItem data={this.props.data} activeContent={this.props.activeContent}/>
          <RaisedButton className='space-left-s' label='History changes' disabled/>
        </div>
        <Table
          className='space-top-s'
          height={'27em'}
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
              {headerRows(this.props.activeContent)}
              <TableHeaderColumn tooltip='The Actions'>Actions</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
            deselectOnClickaway
            showRowHover
            stripedRows={false}
          >
            {filters(this.props.data[this.props.activeContent.value],
              this.props.activeContent,
              this.state.filtering,
              this.state.searchBy)
              .map((row, index) => (
                <TableRow key={index}>
                  <TableRowColumn>{index}</TableRowColumn>)
                  {rows(row, this.props.activeContent)}
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