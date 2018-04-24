import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Table,
  TableHeader,
  TableRow,
  TableBody,
  TableHeaderColumn,
  TableRowColumn,
} from 'material-ui';

export default class SelectDataTable extends Component {
  static propTypes = {
    body: PropTypes.array.isRequired,
    checkedItemsIndexes: PropTypes.array.isRequired,
    onCheckItem: PropTypes.func.isRequired,
  }
  state = {
    header: [],
  }

  componentWillMount() {
    const { header } = this.state;

    header.push({ tooltip: 'The ID', data: 'ID' });
    header.push({ tooltip: 'The Name', data: 'Name' });
    header.push({ tooltip: 'The Vendor Code', data: 'Vendor Code' });
  }

  render() {
    const { body, onCheckItem, checkedItemsIndexes } = this.props;
    const { header } = this.state;

    if (!body.length > 0) return <div className="spinner f-s-22 gray-text">Please add your first item</div>;

    return (
      <Table
        className="m-t-10"
        fixedHeader
        fixedFooter={false}
        selectable
        multiSelectable
        onRowSelection={onCheckItem}
      >
        <TableHeader
          displaySelectAll={false}
          adjustForCheckbox
          enableSelectAll
        >
          <TableRow>
            {header.map((row, idx) => (
              <TableHeaderColumn key={`header-row-${idx}`} tooltip={row.tooltip}>{row.data}</TableHeaderColumn>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox
          deselectOnClickaway={false}
          showRowHover
          stripedRows={false}
        >
          {body.map((row, index) => (
            <TableRow key={`body-row-${index}`} selected={checkedItemsIndexes.findIndex(idx => idx === index) >= 0}>
              {Object.values(row).map((key, idx) => (
                <TableRowColumn key={`body-row-${index}-${idx}`}>{key}</TableRowColumn>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
}
