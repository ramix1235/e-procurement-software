import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEqual from 'lodash/isEqual';

import { getSuppliers } from '../../redux/actions/supplierActions';

import DataTable from '@components/containers/DataTable';
import Loader from '@components/containers/Loader';
import { Actions } from '@components/Inventory/Actions';


@connect(state => ({
  suppliers: state.suppliers,
}))
export default class InventorySuppliers extends Component {
  static propTypes = {
    activeType: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    suppliers: PropTypes.array.isRequired,
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
    header.push({ tooltip: 'The Address', data: 'Address' });
    header.push({ tooltip: 'The Phone', data: 'Phone' });
    header.push({ tooltip: 'The Email', data: 'Email' });
    header.push({ tooltip: 'The Actions', data: 'Actions' });

    this.setState({ isLoading: true });
    dispatch(getSuppliers())
      .then(suppliers => this.setState({ isLoading: false }));
    this.updateTableData();
  }

  componentDidUpdate(prevProps, prevState) {
    const { suppliers, activeType } = this.props;

    if (
      !isEqual(suppliers, prevProps.suppliers)
      || prevProps.activeType !== activeType
    ) {
      this.updateTableData();
    }
  }

  updateTableData = () => {
    const { tableData: { header } } = this.state;
    const { suppliers, activeType } = this.props;
    const updatedModelData = suppliers.map((supplier, idx) => (
      {
        id: idx,
        name: supplier.name,
        address: supplier.address,
        phone: supplier.phone,
        email: supplier.email,
        actions: <Actions item={supplier} activeType={activeType} />,
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
