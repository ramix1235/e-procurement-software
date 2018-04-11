import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Paper from 'material-ui/Paper';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import DataTable from './DataTable';

export default class ActiveContent extends Component {
  static propTypes = {
    data: PropTypes.object,
  };

  static defaultProps = {
    data: {},
  }

  state = {
    activeContent: {
      value: 'products',
      label: 'Products',
      single: 'product',
    },
  }

  handleActiveContent = (event, index, value) => {
    let singleVal;

    switch (index) {
      case 'products':
        singleVal = 'product';
        break;
      case 'categories':
        singleVal = 'category';
        break;
      case 'currencies':
        singleVal = 'currency';
        break;
      case 'suppliers':
        singleVal = 'supplier';
        break;
      default: break;
    }
    this.setState({
      activeContent: {
        value: index,
        label: index[0].toUpperCase() + index.slice(1),
        single: singleVal,
      },
    });
  }

  render() {
    const { data } = this.props;
    const { activeContent } = this.state;

    return (
      <div>
        <Paper zDepth={1}>
          <RadioButtonGroup
            name="contents"
            defaultSelected="products"
            className="radio-group space-top-s-pd space-left-xs2"
            onChange={this.handleActiveContent}
          >
            <RadioButton
              value="products"
              label="Products"
            />
            <RadioButton
              value="categories"
              label="Categories"
              className="radio-btn"
            />
            <RadioButton
              value="currencies"
              label="Currencies"
              className="radio-btn"
            />
            <RadioButton
              value="suppliers"
              label="Suppliers"
              className="radio-btn"
            />
          </RadioButtonGroup>
          <DataTable
            data={data}
            activeContent={activeContent}
          />
        </Paper>
      </div>
    );
  }
}
