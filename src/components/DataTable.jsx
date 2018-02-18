import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import AddItem from './CRUD/AddItem';
import { rows, headerRows, menuItems, filters } from './rows';
import { Table, TableBody, TableHeader, TableRow } from 'material-ui/Table';

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
        <div className='right space-top-s'>
          <AddItem data={this.props.data} activeContent={this.props.activeContent}/>
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
              {headerRows(this.props.activeContent)}
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
                  {rows(index, row, this.props)}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

DataTable.propTypes = propTypes;