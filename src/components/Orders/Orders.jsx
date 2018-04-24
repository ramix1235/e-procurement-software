import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEqual from 'lodash/isEqual';
import moment from 'moment';

import { getOrders } from '../../redux/actions/orderActions';

import { Paper } from 'material-ui';
import DataTable from '@components/containers/DataTable';
import Loader from '@components/containers/Loader';
import OrderActions from './Actions/OrderActions';

@connect(state => ({
  // orders: state.orders.orders,
  orders: state.orders,
}))
export default class Orders extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    orders: PropTypes.array.isRequired,
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
    header.push({ tooltip: 'The Start Date', data: 'Start Date' });
    header.push({ tooltip: 'The End Date', data: 'End Date' });
    header.push({ tooltip: 'The Status', data: 'Status' });
    header.push({ tooltip: 'The Actions', data: 'Actions' });

    this.setState({ isLoading: true });
    dispatch(getOrders())
      .then(orders => this.setState({ isLoading: false }));
    this.updateTableData();
  }

  componentDidUpdate(prevProps, prevState) {
    const { orders } = this.props;

    if (
      !isEqual(orders, prevProps.orders)
    ) {
      this.updateTableData();
    }
  }

  updateTableData = () => {
    const { tableData: { header } } = this.state;
    const { orders } = this.props;
    const updatedModelData = orders.map((order, idx) => (
      {
        id: idx,
        name: order.name,
        startDate: moment(order.startDate).format('YYYY-MM-DD'),
        endDate: moment(order.endDate).format('YYYY-MM-DD'),
        status: order.status,
        actions: <OrderActions item={order} />,
      }
    ));

    this.setState({ tableData: { body: updatedModelData, header } });
  }

  render() {
    const { tableData: { header, body }, isLoading } = this.state;

    return (
      <Fragment>
        <Paper zDepth={1} className="d-f f-d-column">
          <div className="d-f f-d-row ai-c jc-fe m-r-50 m-t-52">
            <OrderActions />
          </div>
          <div className="orders-table">
            {isLoading
              ? <Loader />
              : <DataTable header={header} body={body} />}
          </div>
        </Paper>
      </Fragment>
    );
  }
}
