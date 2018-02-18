import React, { Component } from 'react';
import './App.css';
import AppBar from 'material-ui/AppBar';
import { Tabs, Tab } from 'material-ui/Tabs';
import ActiveContent from './ActiveContent';
import DataCharts from './DataCharts';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProducts  } from '../redux/actions/productActions';
import { getCategories  } from '../redux/actions/categoryActions';
import { getCurrencies  } from '../redux/actions/currencyActions';
import { getSuppliers  } from '../redux/actions/supplierActions';

const propTypes = {
  products: PropTypes.array,
  categories: PropTypes.array,
  currencies: PropTypes.array,
  suppliers: PropTypes.array,
  loadProducts: PropTypes.func,
  loadCategories: PropTypes.func,
  loadCurrencies: PropTypes.func,
  loadSuppliers: PropTypes.func
};

class Main extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadProducts();
    this.props.loadCategories();
    this.props.loadCurrencies();
    this.props.loadSuppliers();
    // this.props[`load${this.state.activeContent.label}`]();
  }

  render() {
    return (
      <div>
        <AppBar
          title='Friendly Suppliers'
          iconStyleLeft={{ display: 'none' }}
        />
        <Tabs className='space-top-xs'>
          <Tab label='Inventory'>
            <ActiveContent data={this.props}/>
          </Tab>
          <Tab label='Charts'>
            <DataCharts data={this.props}/>
          </Tab>
          <Tab label='Orders'>
          </Tab>
        </Tabs>
      </div>
    );
  }
}

Main.propTypes = propTypes;

export default connect(
  state => ({
    products: state.products,
    categories: state.categories,
    currencies: state.currencies,
    suppliers: state.suppliers
  }),
  dispatch => ({
    loadProducts: () => dispatch(getProducts()),
    loadCategories: () => dispatch(getCategories()),
    loadCurrencies: () => dispatch(getCurrencies()),
    loadSuppliers: () => dispatch(getSuppliers())
  })
)(Main);