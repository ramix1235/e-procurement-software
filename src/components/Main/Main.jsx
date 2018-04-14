import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getProducts } from '../../redux/actions/productActions';
import { getCategories } from '../../redux/actions/categoryActions';
import { getCurrencies } from '../../redux/actions/currencyActions';
import { getSuppliers } from '../../redux/actions/supplierActions';

import { Tabs, Tab } from 'material-ui/Tabs';
import AppBar from 'material-ui/AppBar';
import ActiveContent from '../ActiveContent';
import DataCharts from '../DataCharts';

@connect(state => ({
  products: state.products,
  categories: state.categories,
  currencies: state.currencies,
  suppliers: state.suppliers,
}))
export default class Main extends Component {
  static propTypes = {
    categories: PropTypes.array.isRequired,
    currencies: PropTypes.array.isRequired,
    products: PropTypes.array.isRequired,
    suppliers: PropTypes.array.isRequired,
  }

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(getProducts());
    dispatch(getCategories());
    dispatch(getCurrencies());
    dispatch(getSuppliers());
  }

  render() {
    const {
      categories,
      currencies,
      products,
      suppliers,
    } = this.props;

    return (
      <Fragment>
        <AppBar
          title="Friendly Suppliers"
          iconStyleLeft={{ display: 'none' }}
        />
        <Tabs className="space-top-xs">
          <Tab label="Inventory">
            <ActiveContent data={{
              categories,
              currencies,
              products,
              suppliers,
            }}
            />
          </Tab>
          <Tab label="Charts">
            <DataCharts data={{
              categories,
              currencies,
              products,
              suppliers,
            }}
            />
          </Tab>
          <Tab label="Orders">
            <div>Orders</div>
          </Tab>
        </Tabs>
      </Fragment>
    );
  }
}
