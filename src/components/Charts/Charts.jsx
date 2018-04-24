import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';

import { getProducts } from '../../redux/actions/productActions';

import { AreaChart, linearGradient, XAxis, YAxis, CartesianGrid, Tooltip, Area, Label } from 'recharts';
import { Paper, DropDownMenu, MenuItem } from 'material-ui';
import Loader from '@components/containers/Loader';

@connect(state => ({
  products: state.products,
}))
export default class Charts extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    products: PropTypes.array.isRequired,
  }

  state = {
    productPriceChartData: [],
    productSuppliersAmountChartData: [],
    productPriceChartBy: 0,
    isLoadingProductChartData: false,
  }

  componentWillMount() {
    const { dispatch } = this.props;

    this.setState({ isLoadingProductChartData: true });
    dispatch(getProducts())
      .then(() => {
        this.formattedDataForProductPriceChart();
        this.formattedDataForProductSuppliersAmountChart();
        this.setState({ isLoadingProductChartData: false });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    const { productPriceChartBy } = this.state;

    if (
      !isEqual(productPriceChartBy, prevState.productPriceChartBy)
    ) {
      this.formattedDataForProductPriceChart();
    }
  }

  handleDropDownProductPriceChart = (event, index, value) => {
    this.setState({ productPriceChartBy: value });
  }

  formattedDataForProductPriceChart = () => {
    const { productPriceChartBy } = this.state;

    const prefilledData = this.props.products[productPriceChartBy].suppliers
      .map(supplier => ({ supplierName: supplier.supplier.name, price: supplier.price }))
      .sort((a, b) => a.price - b.price);

    this.setState({ productPriceChartData: prefilledData });
  }

  formattedDataForProductSuppliersAmountChart = () => {
    const prefilledData = this.props.products
      .map(product => ({ productName: product.name, suppliersAmount: product.suppliers.length }))
      .sort((a, b) => a.price - b.price);

    this.setState({ productSuppliersAmountChartData: prefilledData });
  }

  renderProductPriceChart = () => {
    const { productPriceChartData, productPriceChartBy } = this.state;
    const { products } = this.props;

    return (
      <div>
        <div className="m-l-70">
          <div className="d-f ai-c jc-c f-d-row">
            <span>Product:</span>
            <DropDownMenu className="m-b-20" value={productPriceChartBy} onChange={this.handleDropDownProductPriceChart}>
              {products.map((product, idx) => (
                <MenuItem key={`status-${idx}`} value={idx} primaryText={product.name} />
              ))}
            </DropDownMenu>
          </div>
        </div>
        <AreaChart
          width={730}
          height={250}
          data={productPriceChartData}
          margin={{
            top: 0,
            right: 0,
            left: 10,
            bottom: 35,
          }}
        >
          <defs>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="supplierName">
            <Label value="Supplier name" position="insideBottom" offset={-30} />
          </XAxis>
          <YAxis>
            <Label value="Price" angle={-90} position="insideBottomLeft" />
          </YAxis>
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area type="monotone" dataKey="price" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
        </AreaChart>
      </div>
    );
  }

  renderProductSuppliersAmountChart = () => {
    const { productSuppliersAmountChartData } = this.state;

    return (
      <Fragment>
        <AreaChart
          width={730}
          height={250}
          data={productSuppliersAmountChartData}
          margin={{
            top: 0,
            right: 0,
            left: 10,
            bottom: 35,
          }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="productName">
            <Label value="Product name" position="insideBottom" offset={-30} />
          </XAxis>
          <YAxis>
            <Label value="Suppliers amount" angle={-90} position="insideBottomLeft" />
          </YAxis>
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area type="monotone" dataKey="suppliersAmount" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
        </AreaChart>
      </Fragment>
    );
  }

  render() {
    const { isLoadingProductChartData } = this.state;

    return (
      <Fragment>
        <Paper zDepth={1} className="d-f f-d-column">
          <div className="charts-table f-d-column ai-c p-t-30">
            {isLoadingProductChartData
              ? <Loader className="d-f flx-1" />
              : (
                <Fragment>
                  {this.renderProductPriceChart()}
                  <div className="m-t-80">
                    {this.renderProductSuppliersAmountChart()}
                  </div>
                </Fragment>
              )}
          </div>
        </Paper>
      </Fragment>
    );
  }
}
