/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEqual from 'lodash/isEqual';

import { getSuppliers } from '../../../../redux/actions/supplierActions';
import { sendOrderEmailToSupplier } from '../../../../../api/order';
// import { updateCheckedItemsIndexes } from '../../../../redux/actions/orderActions';

import { TextField, FlatButton, DropDownMenu, MenuItem, DatePicker, RaisedButton } from 'material-ui';
import SelectDataTable from './SelectDataTable';
import Loader from '@components/containers/Loader';

import { ORDER_STATUSES } from '@constants/statuses';

const {
  IN_PROGRESS,
  PAID,
  DELIVERED,
  CANCELED,
  NONE,
} = ORDER_STATUSES;
const statusTypes = [IN_PROGRESS, PAID, DELIVERED, CANCELED, NONE];

@connect(state => ({
  suppliers: state.suppliers,
  // checkedItemsIndexes: state.orders.checkedItemsIndexes,
}))
export default class OrderForm extends Component {
  static propTypes = {
    // checkedItemsIndexes: PropTypes.array.isRequired,
    getActions: PropTypes.func.isRequired,
    suppliers: PropTypes.array.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    item: PropTypes.object,
  }

  static defaultProps = {
    item: {
      _id: null,
      name: '',
      startDate: null,
      endDate: null,
      status: '',
      data: {
        products: [],
        supplier: {},
      },
    },
  }

  state = {
    statusBy: this.props.item.status,
    startDateBy: this.props.item.startDate ? new Date(this.props.item.startDate) : null,
    endDateBy: this.props.item.endDate ? new Date(this.props.item.endDate) : null,
    supplierBy: this.props.item.data.supplier,
    isLoading: false,
    isEmailSending: false,
    body: [],
    checkedItemsIndexes: this.props.item.data.products,
  }

  componentWillMount() {
    const { dispatch, getActions, onClose } = this.props;
    const { statusBy, startDateBy, endDateBy } = this.state;
    const actions = [
      <FlatButton
        key={0}
        label="Ok"
        primary
        onClick={this.handleSubmitClick}
      />,
      <FlatButton
        key={1}
        label="Discard"
        primary
        onClick={onClose}
      />,
    ];

    getActions(actions);
    this.setState({ isLoading: true });
    dispatch(getSuppliers())
      .then((suppliers) => {
        const { supplierBy, checkedItemsIndexes } = this.state;
        let foundSupplier = suppliers[0];
        const foundCheckedItemsIndexes = [];

        if (supplierBy.name) {
          foundSupplier = suppliers.find(supplier => supplier.name === supplierBy.name);
          foundSupplier.products.forEach((product, index) => {
            if (checkedItemsIndexes.find(obj => obj.name === product.product.name)) foundCheckedItemsIndexes.push(index);
          });
        }

        this.setState({
          supplierBy: foundSupplier,
          statusBy,
          startDateBy,
          endDateBy,
          checkedItemsIndexes: foundCheckedItemsIndexes,
        });
      })
      .finally(() => {
        this.setState({ isLoading: false });
        this.updateTableData();
      });
  }

  componentDidUpdate(prevProps, prevState) {
    const { supplierBy } = this.state;

    if (
      !isEqual(supplierBy, prevState.supplierBy)
    ) {
      this.updateTableData();
    }
  }

  handleDropDownStatuses = (event, index, value) => {
    const { startDateBy, endDateBy, supplierBy } = this.state;

    this.setState({
      statusBy: value,
      startDateBy,
      endDateBy,
      supplierBy,
    });
  }

  handleDataPickerStartDate = (none, date) => {
    const { statusBy, endDateBy, supplierBy } = this.state;

    this.setState({
      statusBy,
      startDateBy: date,
      endDateBy,
      supplierBy,
    });
  }

  handleDataPickerEndDate = (none, date) => {
    const { statusBy, startDateBy, supplierBy } = this.state;

    this.setState({
      statusBy,
      startDateBy,
      endDateBy: date,
      supplierBy,
    });
  }

  handleDropDownSuppliers = (event, index, value) => {
    const { statusBy, endDateBy, startDateBy } = this.state;

    this.setState({
      statusBy,
      startDateBy,
      endDateBy,
      supplierBy: value,
    });
  }

  handleSubmitClick = () => {
    const { onSubmit, item } = this.props;
    const { statusBy } = this.state;

    const formattedCheckedItems = this.formattedData();

    const model = {
      _id: item._id,
      name: this.nameField.input.value,
      startDate: this.startDateField.state.date,
      endDate: this.endDateField.state.date,
      status: statusBy,
      data: formattedCheckedItems,
    };

    onSubmit(model);
  }

  handleCheckedProduct = (checkedItemsIndexes) => {
    // const { dispatch } = this.props;

    console.log(checkedItemsIndexes);
    this.setState({ checkedItemsIndexes });
    // dispatch(updateCheckedItemsIndexes(checkedItemsIndexes));
  }

  handleEmailSubmit = () => {
    const formattedCheckedItems = this.formattedData();

    this.setState({ isEmailSending: true });
    sendOrderEmailToSupplier(formattedCheckedItems)
      .catch((err) => {
        if (err) console.log(err);
      })
      .finally(() => this.setState({ isEmailSending: false }));
  }

  updateTableData = () => {
    const { supplierBy } = this.state;

    const updatedModelData = supplierBy.products.map((product, idx) => (
      {
        id: idx,
        name: product.product.name,
        vendorCode: product.product.vendorCode,
      }
    ));

    this.setState({ body: updatedModelData });
  }

  formattedData = () => {
    const { supplierBy, checkedItemsIndexes } = this.state;

    return {
      products: checkedItemsIndexes
        .map(index => ({
          price: supplierBy.products[index].price,
          name: supplierBy.products[index].product.name,
          vendorCode: supplierBy.products[index].product.vendorCode,
        })),
      supplier: {
        address: supplierBy.address,
        email: supplierBy.email,
        name: supplierBy.name,
        phone: supplierBy.phone,
      },
    };
  }

  render() {
    const { item, suppliers } = this.props;
    const {
      statusBy,
      startDateBy,
      endDateBy,
      supplierBy,
      isLoading,
      body,
      checkedItemsIndexes,
      isEmailSending,
    } = this.state;
    // const { checkedItemsIndexes } = this.props;

    return (
      <div className="d-f f-d-row">
        <div>
          <TextField
            ref={(ref) => { this.nameField = ref; }}
            floatingLabelText="Name"
            className="space-left-s"
            defaultValue={item.name}
          />
          <br />
          <DatePicker
            ref={(ref) => { this.startDateField = ref; }}
            value={startDateBy}
            shouldDisableDate={day => (endDateBy ? day > endDateBy : false)}
            onChange={this.handleDataPickerStartDate}
            className="space-left-s"
            hintText="Start date"
            autoOk
          />
          <br />
          <DatePicker
            ref={(ref) => { this.endDateField = ref; }}
            value={endDateBy}
            shouldDisableDate={day => (startDateBy ? day < startDateBy : false)}
            onChange={this.handleDataPickerEndDate}
            className="space-left-s"
            hintText="End date"
            autoOk
          />
          <br />
          <DropDownMenu value={statusBy} onChange={this.handleDropDownStatuses}>
            {statusTypes.map((status, idx) => (
              <MenuItem key={`status-${idx}`} value={status} primaryText={status} />
            ))}
          </DropDownMenu>
          <br />
          <br />
          {isEmailSending
            ? <Loader />
            : <RaisedButton className="space-left-s" label={`Send e-mail to ${supplierBy.name}`} onClick={this.handleEmailSubmit} />
          }
        </div>
        <div className="d-f f-d-column flx-1 m-l-50">
          <DropDownMenu value={supplierBy} onChange={this.handleDropDownSuppliers}>
            {suppliers.map((supplier, idx) => (
              <MenuItem key={`supplier-${idx}`} value={supplier} primaryText={supplier.name} />
            ))}
          </DropDownMenu>
          <div className="d-f flx-1 jc-c maxh-45">
            {isLoading
              ? <Loader />
              : <SelectDataTable body={body} onCheckItem={this.handleCheckedProduct} checkedItemsIndexes={checkedItemsIndexes} />}
          </div>
        </div>
      </div>
    );
  }
}
