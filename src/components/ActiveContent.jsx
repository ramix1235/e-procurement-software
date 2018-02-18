import React, { Component } from 'react';
import DataTable from './DataTable';
import PropTypes from 'prop-types';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import Paper from 'material-ui/Paper';

const propTypes = {
  data : PropTypes.object
};

export default class ActiveContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeContent: { value: 'products', label: 'Products', single: 'product' }
    };
  }

  handleActiveContent = (event, index, value) => {
    let singleVal;

    switch (index) {
      case 'products':
        singleVal = 'product';
        this.props.data.loadProducts();
        break;
      case 'categories':
        singleVal = 'category';
        this.props.data.loadCategories();
        break;
      case 'currencies':
        singleVal = 'currency';
        this.props.data.loadCurrencies();
        break;
      case 'suppliers':
        singleVal = 'supplier';
        this.props.data.loadSuppliers();
        break;
      default: break;
    }
    this.setState({ activeContent: { value: index, label: index[0].toUpperCase() + index.slice(1), single: singleVal } });
  }

  render() {
    return (
      <div>
        <Paper zDepth={1}>
          <RadioButtonGroup name='contents' defaultSelected='products' className='radio-group space-top-s-pd space-left-xs2' onChange={this.handleActiveContent}>
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
          <DataTable data={this.props.data} activeContent={this.state.activeContent} />
        </Paper>
      </div>
    );
  }
}

ActiveContent.propTypes = propTypes;