import React, { Component } from 'react';
import DataTable from './DataTable';
import PropTypes from 'prop-types';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
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

class ActiveContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeContent: { value: 'products', label: 'Products', single: 'product' }
    };
  }

  componentDidMount() {
    this.props.loadProducts();
    this.props.loadCategories();
    this.props.loadCurrencies();
    this.props.loadSuppliers();
    // this.props[`load${this.state.activeContent.label}`]();
  }

  handleActiveContent = (event, index, value) => {
    let singleVal;

    switch (index) {
      case 'products': singleVal = 'product'; break;
      case 'categories': singleVal = 'category'; break;
      case 'currencies': singleVal = 'currency'; break;
      case 'suppliers': singleVal = 'supplier'; break;
      default: break;
    }
    this.setState({ activeContent: { value: index, label: index[0].toUpperCase() + index.slice(1), single: singleVal } });
  }

  render() {
    return (
      <div>
        <RadioButtonGroup name='contents' defaultSelected='products' className='radio-group space-top-s space-left-xs2' onChange={this.handleActiveContent}>
          <RadioButton
            value='products'
            label='Products'
          />
          <RadioButton
            value='categories'
            label='Categories'
            className='radio-btn'
          />
          <RadioButton
            value='currencies'
            label='Currencies'
            className='radio-btn'
          />
          <RadioButton
            value='suppliers'
            label='Suppliers'
            className='radio-btn'
          />
        </RadioButtonGroup>
        <DataTable data={this.props} activeContent={this.state.activeContent} />
      </div>
    );
  }
}

ActiveContent.propTypes = propTypes;

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
)(ActiveContent);