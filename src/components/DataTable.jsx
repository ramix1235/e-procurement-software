import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import { Table, TableBody, TableHeader, TableRow } from 'material-ui/Table';
import { rows, headerRows, menuItems, filters } from './rows';
import AddItem from './CRUD/AddItem';

export default class DataTable extends Component {
  static propTypes = {
    activeContent: PropTypes.object,
    data: PropTypes.object,
  }

  static defaultProps = {
    data: {},
    activeContent: {},
  }

  state = {
    filtering: null,
    searchBy: 0,
  }

  handleDataTable = (event, index, value) => {
    this.setState({ filtering: event.target.value });
  }

  handleDropDown = (event, index, value) => {
    this.setState({ searchBy: value });
  }

  render() {
    const { activeContent, data } = this.props;
    const { searchBy, filtering } = this.state;

    return (
      <div>
        <DropDownMenu
          className="dropdown-s"
          value={searchBy}
          onChange={this.handleDropDown}
        >
          {menuItems(activeContent)}
        </DropDownMenu>
        <TextField
          className="space-left-s"
          hintText="Search"
          onChange={this.handleDataTable}
        />
        <div className="right space-top-s">
          <AddItem
            data={data}
            activeContent={activeContent}
          />
        </div>
        <Table
          className="space-top-s"
          height="27em"
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
              {headerRows(activeContent)}
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
            deselectOnClickaway
            showRowHover
            stripedRows={false}
          >
            {filters(
              data[activeContent.value],
              activeContent,
              filtering,
              searchBy
            ).map((row, index) => (
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
