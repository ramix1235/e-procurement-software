import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { DropDownMenu, MenuItem } from 'material-ui';

import { INVENTORY_TYPES } from '@constants/inventory';

export default class FilterDropdown extends Component {
  static propTypes = {
    activeType: PropTypes.string,
    className: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    activeType: '',
    className: '',
    value: '',
    onChange: () => null,
  }

  renderMenu = () => {
    const { activeType } = this.props;

    switch (activeType) {
      case INVENTORY_TYPES.CATEGORIES:
        return (
          <MenuItem key={0} value="name" primaryText="Name" />
        );
      case INVENTORY_TYPES.CURRENCIES:
        return (
          <MenuItem key={0} value="name" primaryText="Name" />
        );
      case INVENTORY_TYPES.PRODUCTS:
        return [
          <MenuItem key={0} value="name" primaryText="Name" />,
          <MenuItem key={1} value="vendorCode" primaryText="Vendor Code" />,
          <MenuItem key={2} value="category" primaryText="Category" />,
          <MenuItem key={3} value="price" primaryText="Price" />,
        ];
      case INVENTORY_TYPES.SUPPLIERS:
        return [
          <MenuItem key={0} value="name" primaryText="Name" />,
          <MenuItem key={1} value="address" primaryText="Address" />,
          <MenuItem key={2} value="telephone" primaryText="Telephone" />,
        ];
      default:
        return <div />;
    }
  }

  render() {
    const { onChange, value, className } = this.props;

    return (
      <DropDownMenu
        className={className}
        value={value}
        onChange={onChange}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        {this.renderMenu()}
      </DropDownMenu>
    );
  }
}
