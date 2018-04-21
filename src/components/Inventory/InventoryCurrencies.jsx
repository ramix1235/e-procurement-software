import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEqual from 'lodash/isEqual';

import { getCurrencies } from '../../redux/actions/currencyActions';

import DataTable from '@components/containers/DataTable';
import Loader from '@components/containers/Loader';
import { Actions } from '@components/Inventory/Actions';

@connect(state => ({
  currencies: state.currencies,
}))
export default class InventoryCurrencies extends Component {
  static propTypes = {
    activeType: PropTypes.string.isRequired,
    currencies: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
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
    header.push({ tooltip: 'The Actions', data: 'Actions' });

    this.setState({ isLoading: true });
    dispatch(getCurrencies())
      .then(currencies => this.setState({ isLoading: false }));
    this.updateTableData();
  }

  componentDidUpdate(prevProps, prevState) {
    const { currencies, activeType } = this.props;

    if (
      !isEqual(currencies, prevProps.currencies)
      || prevProps.activeType !== activeType
    ) {
      this.updateTableData();
    }
  }

  updateTableData = () => {
    const { tableData: { header } } = this.state;
    const { activeType, currencies } = this.props;
    const updatedModelData = currencies.map((currency, idx) => (
      {
        id: idx,
        name: currency.name,
        actions: <Actions item={currency} activeType={activeType} />,
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
