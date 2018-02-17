import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import { connect } from 'react-redux';
import { addProduct  } from '../../redux/actions/productActions';
import { addFields } from '../rows';

const propTypes = {
  data: PropTypes.object,
  activeContent: PropTypes.object,
  products: PropTypes.array,
  addProduct: PropTypes.func
};

class AddItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      itemData: {
        categoryBy: null,
        currencyBy: null,
        current: null
      },
      feedback: false,
      feedbackMsg: 'Complete!'
    };
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleRequestClose = () => {
    this.setState({ feedback: false });
  }

  handleSaveData = () => {
    const newProduct = {
      name: document.getElementById(this.refs.nameField.uniqueId).value,
      vendorCode: document.getElementById(this.refs.vendorCodeField.uniqueId).value,
      category: this.state.itemData.categoryBy,
      price: +document.getElementById(this.refs.priceField.uniqueId).value,
      currency: this.state.itemData.currencyBy
    };

    this.props.addProduct(newProduct)
      .then(this.setState({ feedback: true, feedbackMsg: 'Complete!' }))
      .catch(err => {
        // console.log(err.response.data.message);
        if (err) this.setState({ feedbackMsg: 'Failed!' });
      });
    this.setState({ open: false });
  }

  handleDropDownCategories = (event, index, value) => {
    this.setState({ itemData: { categoryBy: value, currencyBy: this.state.itemData.currencyBy, current: this.state.itemData.current } });
  };

  handleDropDownCurrencies = (event, index, value) => {
    this.setState({ itemData: { categoryBy: this.state.itemData.categoryBy, currencyBy: value, current: this.state.itemData.current } });
  };

  render() {
    const actions = [
      <FlatButton
        label='Ok'
        key={0}
        primary
        // disabled
        onClick={this.handleSaveData}
      />,
      <FlatButton
        label='Discard'
        key={1}
        primary
        onClick={this.handleClose}
      />
    ];

    return (
      <div className='element-inline'>
        <RaisedButton label={`Add ${this.props.activeContent.single}`} onClick={this.handleOpen} />
        <Dialog
          title={`Add ${this.props.activeContent.single}`}
          actions={actions}
          modal
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent
        >
          {addFields(this.props,
            this.state.itemData,
            this.handleDropDownCategories,
            this.handleDropDownCurrencies)}
        </Dialog>
        <Snackbar
          open={this.state.feedback}
          message={this.state.feedbackMsg}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    );
  }
}

AddItem.propTypes = propTypes;

export default connect(
  state => ({
    products: state.products
  }),
  dispatch => ({
    addProduct: (data) => dispatch(addProduct(data))
  })
)(AddItem);