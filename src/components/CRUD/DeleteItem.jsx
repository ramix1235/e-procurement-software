import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteProduct  } from '../../redux/actions/productActions';
import { deleteCategory  } from '../../redux/actions/categoryActions';
import { deleteCurrency  } from '../../redux/actions/currencyActions';
import { deleteSupplier  } from '../../redux/actions/supplierActions';
import { deleteItems } from '../rows';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import Dialog from 'material-ui/Dialog';

const propTypes = {
  data: PropTypes.object,
  activeContent: PropTypes.object,
  products: PropTypes.array,
  categories: PropTypes.array,
  currencies: PropTypes.array,
  suppliers: PropTypes.array,
  deleteProduct: PropTypes.func,
  deleteCategory: PropTypes.func,
  deleteCurrency: PropTypes.func,
  deleteSupplier:PropTypes.func
};

class DeleteItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
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

  handleDeleteData = () => {
    deleteItems(this);
    this.setState({ open: false });
  }

  render() {
    const actions = [
      <FlatButton
        label='Ok'
        key={0}
        primary
        // disabled
        onClick={this.handleDeleteData}
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
        <FlatButton label='Delete' onClick={this.handleOpen}/>
        <Dialog
          title={`Delete ${this.props.activeContent.single}`}
          actions={actions}
          modal
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent
        >
          <span>Are you shure that you want to delete {this.props.data.name}?</span>
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

DeleteItem.propTypes = propTypes;

export default connect(
  state => ({
    products: state.products,
    categories: state.categories,
    currencies: state.currencies,
    suppliers: state.suppliers
  }),
  dispatch => ({
    deleteProduct: (data) => dispatch(deleteProduct(data)),
    deleteCategory: (data) => dispatch(deleteCategory(data)),
    deleteCurrency: (data) => dispatch(deleteCurrency(data)),
    deleteSupplier: (data) => dispatch(deleteSupplier(data))
  })
)(DeleteItem);