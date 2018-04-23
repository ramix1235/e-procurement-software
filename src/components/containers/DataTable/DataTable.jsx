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

export default class DataTable extends Component {
  static propTypes = {
    body: PropTypes.array.isRequired,
    header: PropTypes.array.isRequired,
    filterOptions: PropTypes.object,
  }

  static defaultProps = {
    filterOptions: {
      by: '',
      value: '',
    },
  }

  filter = () => {
    const { body, filterOptions: { by, value } } = this.props;

    if (by === '' || value === '') return body;

    return body.filter(item => item[by].match(new RegExp(value, 'i')));
  }

  render() {
    const { header, body } = this.props;

    if (!body.length > 0) return <div className="spinner f-s-48 gray-text">Please add your first item</div>;

    return (
      <Table
        className="m-t-10"
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
            {header.map((row, idx) => (
              <TableHeaderColumn key={`header-row-${idx}`} tooltip={row.tooltip}>{row.data}</TableHeaderColumn>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox={false}
          deselectOnClickaway
          showRowHover
          stripedRows={false}
        >
          {this.filter().map((row, index) => (
            <TableRow key={`body-row-${index}`}>
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
