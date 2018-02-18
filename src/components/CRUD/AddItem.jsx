import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import { connect } from 'react-redux';
import { addProduct  } from '../../redux/actions/productActions';
import { addCategory  } from '../../redux/actions/categoryActions';
import { addCurrency  } from '../../redux/actions/currencyActions';
import { addSupplier  } from '../../redux/actions/supplierActions';
import { addFields, addItems } from '../rows';

const propTypes = {
  data: PropTypes.object,
  activeContent: PropTypes.object,
  products: PropTypes.array,
  categories: PropTypes.array,
  currencies: PropTypes.array,
  suppliers: PropTypes.array,
  addProduct: PropTypes.func,
  addCategory: PropTypes.func,
  addCurrency: PropTypes.func,
  addSupplier: PropTypes.func
};

class AddItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      itemData: {
        categoryBy: null,
        currencyBy: null
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
    addItems(this);
    this.setState({ open: false });
  }

  handleDropDownCategories = (event, index, value) => {
    this.setState({ itemData: { categoryBy: value, currencyBy: this.state.itemData.currencyBy } });
  };

  handleDropDownCurrencies = (event, index, value) => {
    this.setState({ itemData: { categoryBy: this.state.itemData.categoryBy, currencyBy: value } });
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
            {
              handleDropDownCategories: this.handleDropDownCategories,
              handleDropDownCurrencies: this.handleDropDownCurrencies
            },
            null
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

AddItem.propTypes = propTypes;

export default connect(
  state => ({
    products: state.products,
    categories: state.categories,
    currencies: state.currencies,
    suppliers: state.suppliers
  }),
  dispatch => ({
    addProduct: (data) => dispatch(addProduct(data)),
    addCategory: (data) => dispatch(addCategory(data)),
    addCurrency: (data) => dispatch(addCurrency(data)),
    addSupplier: (data) => dispatch(addSupplier(data))
  })
)(AddItem);