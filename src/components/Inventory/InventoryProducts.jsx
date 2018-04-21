import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEqual from 'lodash/isEqual';

import { getProducts } from '../../redux/actions/productActions';

import DataTable from '@components/containers/DataTable';
import Loader from '@components/containers/Loader';
import { Actions } from '@components/Inventory/Actions';


@connect(state => ({
  products: state.products,
}))
export default class InventoryProducts extends Component {
  static propTypes = {
    activeType: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    products: PropTypes.array.isRequired,
    filterOptions: PropTypes.object,
  }

  static defaultProps = {
    filterOptions: {
      by: '',
      value: '',
    },
  }

  state = {
    tableData: {
      header: [],
      body: [],
    },
    isLoading: false,
  }

  componentWillMount() {
    const { dispatch } = this.props;
    const { tableData: { header } } = this.state;

    header.push({ tooltip: 'The ID', data: 'ID' });
    header.push({ tooltip: 'The Name', data: 'Name' });
    header.push({ tooltip: 'The Vendor Code', data: 'Vendor Code' });
    header.push({ tooltip: 'The Category', data: 'Category' });
    header.push({ tooltip: 'The Price', data: 'Price' });
    header.push({ tooltip: 'The Currency', data: 'Currency' });
    header.push({ tooltip: 'The Actions', data: 'Actions' });

    this.setState({ isLoading: true });
    dispatch(getProducts())
      .then(products => this.setState({ isLoading: false }));
    this.updateTableData();
  }

  componentDidUpdate(prevProps, prevState) {
    const { products, activeType } = this.props;

    if (
      !isEqual(products, prevProps.products)
      || prevProps.activeType !== activeType
    ) {
      this.updateTableData();
    }
  }

  updateTableData = () => {
    const { tableData: { header } } = this.state;
    const { products, activeType } = this.props;
    const updatedModelData = products.map((product, idx) => (
      {
        id: idx,
        name: product.name,
        vendorCode: product.vendorCode,
        category: product.category.name,
        price: product.price,
        currency: product.currency.name,
        actions: <Actions item={product} activeType={activeType} />,
      }
    ));

    this.setState({ tableData: { body: updatedModelData, header } });
  }

  render() {
    const { tableData: { header, body }, isLoading } = this.state;
    const { filterOptions } = this.props;

    return (
      <Fragment>
        {isLoading
          ? <Loader />
          : <DataTable header={header} body={body} filterOptions={filterOptions} />}
      </Fragment>
    );
  }
}
