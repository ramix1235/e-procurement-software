import React, { Component, Fragment } from 'react';

import { Paper, RadioButtonGroup, RadioButton, TextField } from 'material-ui';
import FilterDropdown from '@components/containers/FilterDropdown';
import Actions from './Actions/Actions';
import InventoryCategories from './InventoryCategories';
import InventoryProducts from './InventoryProducts';
import InventoryCurrencies from './InventoryCurrencies';
import InventorySuppliers from './InventorySuppliers';

import { INVENTORY_TYPES } from '@constants/inventory';

export default class Inventory extends Component {
  state = {
    activeType: INVENTORY_TYPES.PRODUCTS,
    filterOptions: {
      by: '',
      value: '',
    },
  }

  componentWillMount() {
    this.updateTypeData();
    this.setFilterDefaultValue();
  }

  componentDidUpdate(prevProps, prevState) {
    const { activeType } = this.state;

    if (activeType !== prevState.activeType) {
      this.updateTypeData();
    }
  }

  handleActiveType = (e) => {
    const type = e.target.value;

    this.setState({ activeType: type });
    localStorage.setItem('activeType', type);
  }

  handleChangeDropDownFilter = (e, idx, by) => {
    const { filterOptions: { value } } = this.state;

    this.setState({ filterOptions: { value, by } });
  }

  handleChangeFieldFilter = (e) => {
    const { filterOptions: { by } } = this.state;
    const { target: { value } } = e;

    this.setState({ filterOptions: { value, by } });
  }

  setFilterDefaultValue = () => {
    const { activeType, filterOptions: { value } } = this.state;

    switch (activeType) {
      case INVENTORY_TYPES.CATEGORIES:
      case INVENTORY_TYPES.CURRENCIES:
      case INVENTORY_TYPES.PRODUCTS:
      case INVENTORY_TYPES.SUPPLIERS:
        this.setState({ filterOptions: { value, by: 'name' } });
        break;
      default:
        break;
    }
  }

  updateTypeData = () => {
    const type = localStorage.getItem('activeType');

    this.setState({ activeType: type });
  }

  renderTable = () => {
    const { activeType, filterOptions } = this.state;

    switch (activeType) {
      case INVENTORY_TYPES.CATEGORIES:
        return <InventoryCategories activeType={activeType} filterOptions={filterOptions} />;
      case INVENTORY_TYPES.CURRENCIES:
        return <InventoryCurrencies activeType={activeType} filterOptions={filterOptions} />;
      case INVENTORY_TYPES.PRODUCTS:
        return <InventoryProducts activeType={activeType} filterOptions={filterOptions} />;
      case INVENTORY_TYPES.SUPPLIERS:
        return <InventorySuppliers activeType={activeType} filterOptions={filterOptions} />;
      default:
        return <div />;
    }
  }

  render() {
    const { activeType, filterOptions: { by } } = this.state;

    return (
      <Fragment>
        <Paper zDepth={1} className="d-f f-d-column">
          <RadioButtonGroup
            name="inventoryTypes"
            className="radio-group"
            valueSelected={activeType}
            onChange={this.handleActiveType}
          >
            <RadioButton
              value={INVENTORY_TYPES.PRODUCTS}
              label="Products"
              className="radio-btn"
            />
            <RadioButton
              value={INVENTORY_TYPES.CATEGORIES}
              label="Categories"
              className="radio-btn"
            />
            <RadioButton
              value={INVENTORY_TYPES.CURRENCIES}
              label="Currencies"
              className="radio-btn"
            />
            <RadioButton
              value={INVENTORY_TYPES.SUPPLIERS}
              label="Suppliers"
              className="radio-btn"
            />
          </RadioButtonGroup>
          <div className="d-f f-d-row ai-c jc-sb">
            <div className="d-f f-d-row ai-c">
              <FilterDropdown
                className="filter-dropdown"
                value={by}
                activeType={activeType}
                onChange={this.handleChangeDropDownFilter}
              />
              <TextField
                hintText="Search"
                onChange={this.handleChangeFieldFilter}
              />
            </div>
            <div className="m-r-50">
              <Actions activeType={activeType} />
            </div>
          </div>
          <div className="data-table">
            {this.renderTable()}
          </div>
        </Paper>
      </Fragment>
    );
  }
}
