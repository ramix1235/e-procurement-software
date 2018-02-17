import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import Dialog from 'material-ui/Dialog';
import { addFields } from '../rows';
import { editProduct  } from '../../redux/actions/productActions';


const propTypes = {
  data: PropTypes.object,
  activeContent: PropTypes.object,
  products: PropTypes.array,
  editProduct: PropTypes.func,
  currentItem: PropTypes.object
};

class EditItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      itemData: {
        categoryBy: (this.props.currentItem.category) ? this.props.currentItem.category._id : null,
        currencyBy: (this.props.currentItem.currency) ? this.props.currentItem.currency._id : null,
        current: (this.props.currentItem) ? this.props.currentItem : null
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

  handleDropDownCategories = (event, index, value) => {
    this.setState({ itemData: { categoryBy: value, currencyBy: this.state.itemData.currencyBy, current: this.state.itemData.current } });
  };

  handleDropDownCurrencies = (event, index, value) => {
    this.setState({ itemData: { categoryBy: this.state.itemData.categoryBy, currencyBy: value, current: this.state.itemData.current } });
  };

  handleEditData = () => {
    const editingProduct = {
      _id: this.props.currentItem._id,
      name: document.getElementById(this.refs.nameField.uniqueId).value,
      vendorCode: document.getElementById(this.refs.vendorCodeField.uniqueId).value,
      category: this.state.itemData.categoryBy,
      price: +document.getElementById(this.refs.priceField.uniqueId).value,
      currency: this.state.itemData.currencyBy
    };

    this.props.editProduct(editingProduct)
      .then(this.setState({ feedback: true, feedbackMsg: 'Complete!' }))
      .catch(err => {
        // console.log(err.response.data.message);
        if (err) this.setState({ feedbackMsg: 'Failed!' });
      });
    this.setState({ open: false });
  }

  render() {
    const actions = [
      <FlatButton
        label='Ok'
        key={0}
        primary
        // disabled
        onClick={this.handleEditData}
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
        <FlatButton label='Edit' onClick={this.handleOpen}/>
        <Dialog
          title={`Edit ${this.props.activeContent.single}`}
          actions={actions}
          modal
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent
        >
          {addFields(this.props.data,
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

EditItem.propTypes = propTypes;

export default connect(
  state => ({
    products: state.products
  }),
  dispatch => ({
    editProduct: (data) => dispatch(editProduct(data))
  })
)(EditItem);