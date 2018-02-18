import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import Dialog from 'material-ui/Dialog';
import { addFields, editItems } from '../rows';
import { editProduct  } from '../../redux/actions/productActions';
import { editCategory  } from '../../redux/actions/categoryActions';
import { editCurrency  } from '../../redux/actions/currencyActions';
import { editSupplier  } from '../../redux/actions/supplierActions';

const propTypes = {
  data: PropTypes.object,
  activeContent: PropTypes.object,
  currentItem: PropTypes.object,
  products: PropTypes.array,
  categories: PropTypes.array,
  currencies: PropTypes.array,
  editProduct: PropTypes.func,
  editCategory: PropTypes.func,
  editCurrency: PropTypes.func,
  editSupplier: PropTypes.func
};

class EditItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      itemData: {
        categoryBy: this.props.currentItem.category ? this.props.currentItem.category._id : null,
        currencyBy: this.props.currentItem.currency ? this.props.currentItem.currency._id : null
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
    this.setState({ itemData: { categoryBy: value, currencyBy: this.state.itemData.currencyBy } });
  };

  handleDropDownCurrencies = (event, index, value) => {
    this.setState({ itemData: { categoryBy: this.state.itemData.categoryBy, currencyBy: value } });
  };

  handleEditData = () => {
    editItems(this);
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
            {
              handleDropDownCategories: this.handleDropDownCategories,
              handleDropDownCurrencies: this.handleDropDownCurrencies
            },
            this.props.currentItem
          )}
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
    products: state.products,
    categories: state.categories,
    currencies: state.currencies
  }),
  dispatch => ({
    editProduct: (data) => dispatch(editProduct(data)),
    editCategory: (data) => dispatch(editCategory(data)),
    editCurrency: (data) => dispatch(editCurrency(data)),
    editSupplier: (data) => dispatch(editSupplier(data))
  })
)(EditItem);