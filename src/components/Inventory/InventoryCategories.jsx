import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEqual from 'lodash/isEqual';

import { getCategories } from '../../redux/actions/categoryActions';

import DataTable from '@components/containers/DataTable';
import Loader from '@components/containers/Loader';
import { Actions } from '@components/Inventory/Actions';

@connect(state => ({
  categories: state.categories,
}))
export default class InventoryCategories extends Component {
  static propTypes = {
    activeType: PropTypes.string.isRequired,
    categories: PropTypes.array.isRequired,
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
    dispatch(getCategories())
      .then(categories => this.setState({ isLoading: false }));
    this.updateTableData();
  }

  componentDidUpdate(prevProps, prevState) {
    const { categories, activeType } = this.props;

    if (
      !isEqual(categories, prevProps.categories)
      || prevProps.activeType !== activeType
    ) {
      this.updateTableData();
    }
  }

  updateTableData = () => {
    const { tableData: { header } } = this.state;
    const { activeType, categories } = this.props;
    const updatedModelData = categories.map((category, idx) => (
      {
        id: idx,
        name: category.name,
        actions: <Actions item={category} activeType={activeType} />,
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
