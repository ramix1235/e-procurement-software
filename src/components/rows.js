import React from 'react';
import { TableRowColumn, TableHeaderColumn } from 'material-ui/Table';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import DeleteItem from './CRUD/DeleteItem';
import EditItem from './CRUD/EditItem';
import Drawer from 'material-ui/Drawer';
import Checkbox from 'material-ui/Checkbox';
import Subheader from 'material-ui/Subheader';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';

exports.rows = (index, row, data) => {
  const res = [];

  switch (data.activeContent.value) {
    case 'products':
      res.push(<TableRowColumn key={0}>{index}</TableRowColumn>);
      res.push(<TableRowColumn key={1}>{row.name}</TableRowColumn>);
      res.push(<TableRowColumn key={2}>{row.vendorCode}</TableRowColumn>);
      res.push(<TableRowColumn key={3}>{row.category.name}</TableRowColumn>);
      res.push(<TableRowColumn key={4}>{row.price}</TableRowColumn>);
      res.push(<TableRowColumn key={5}>{row.currency.name}</TableRowColumn>);
      res.push(<TableRowColumn key={6}>
        <EditItem data = {data} currentItem={row} activeContent={data.activeContent} />
        <DeleteItem data = {row} activeContent={data.activeContent}/>
      </TableRowColumn>
      );
      break;
    case 'categories':
      res.push(<TableRowColumn key={0}>{index}</TableRowColumn>);
      res.push(<TableRowColumn key={1}>{row.name}</TableRowColumn>);
      res.push(<TableRowColumn key={2}>
        <EditItem data = {data} currentItem={row} activeContent={data.activeContent}/>
        <DeleteItem data = {row} activeContent={data.activeContent} />
      </TableRowColumn>
      );
      break;
    case 'currencies':
      res.push(<TableRowColumn key={0}>{index}</TableRowColumn>);
      res.push(<TableRowColumn key={1}>{row.name}</TableRowColumn>);
      res.push(<TableRowColumn key={2}>
        <EditItem data = {data} currentItem={row} activeContent={data.activeContent} />
        <DeleteItem data = {row} activeContent={data.activeContent}/>
      </TableRowColumn>
      );
      break;
    case 'suppliers':
      res.push(<TableRowColumn key={0}>{index}</TableRowColumn>);
      res.push(<TableRowColumn key={1}>{row.name}</TableRowColumn>);
      res.push(<TableRowColumn key={2}>{row.address}</TableRowColumn>);
      res.push(<TableRowColumn key={3}>{row.telephone}</TableRowColumn>);
      res.push(<TableRowColumn key={4}>
        <EditItem data = {data} currentItem={row} activeContent={data.activeContent}/>
        <DeleteItem data = {row} activeContent={data.activeContent}/>
      </TableRowColumn>
      );
      break;
    default: break;
  }
  return res;
};

exports.headerRows = (activeContent) => {
  const res = [];

  switch (activeContent.value) {
    case 'products':
      res.push(<TableHeaderColumn key={0} tooltip='The ID'>ID</TableHeaderColumn>);
      res.push(<TableHeaderColumn key={1} tooltip='The Name'>Name</TableHeaderColumn>);
      res.push(<TableHeaderColumn key={2} tooltip='The Vendor Code'>Vendor Code</TableHeaderColumn>);
      res.push(<TableHeaderColumn key={3} tooltip='The Category'>Category</TableHeaderColumn>);
      res.push(<TableHeaderColumn key={4} tooltip='The Price'>Price</TableHeaderColumn>);
      res.push(<TableHeaderColumn key={5} tooltip='The Currency'>Currency</TableHeaderColumn>);
      res.push(<TableHeaderColumn key={6} tooltip='The Actions'>Actions</TableHeaderColumn>);
      break;
    case 'categories':
      res.push(<TableHeaderColumn key={0} tooltip='The ID'>ID</TableHeaderColumn>);
      res.push(<TableHeaderColumn key={1} tooltip='The Name'>Name</TableHeaderColumn>);
      res.push(<TableHeaderColumn key={2} tooltip='The Actions'>Actions</TableHeaderColumn>);
      break;
    case 'currencies':
      res.push(<TableHeaderColumn key={0} tooltip='The ID'>ID</TableHeaderColumn>);
      res.push(<TableHeaderColumn key={1} tooltip='The Name'>Name</TableHeaderColumn>);
      res.push(<TableHeaderColumn key={2} tooltip='The Actions'>Actions</TableHeaderColumn>);
      break;
    case 'suppliers':
      res.push(<TableHeaderColumn key={0} tooltip='The ID'>ID</TableHeaderColumn>);
      res.push(<TableHeaderColumn key={1} tooltip='The Name'>Name</TableHeaderColumn>);
      res.push(<TableHeaderColumn key={1} tooltip='The Address'>Address</TableHeaderColumn>);
      res.push(<TableHeaderColumn key={1} tooltip='The Telephone'>Telephone</TableHeaderColumn>);
      res.push(<TableHeaderColumn key={2} tooltip='The Actions'>Actions</TableHeaderColumn>);
      break;
    default: break;
  }
  return res;
};

exports.menuItems = (activeContent) => {
  const res = [];

  switch (activeContent.value) {
    case 'products':
      res.push(<MenuItem value={0} key={0} primaryText={'Name'} />);
      res.push(<MenuItem value={1} key={1} primaryText={'Vendor Code'} />);
      res.push(<MenuItem value={2} key={2} primaryText={'Category'} />);
      res.push(<MenuItem value={3} key={3} primaryText={'Price'} />);
      res.push(<MenuItem value={4} key={4} primaryText={'Currency'} />);
      break;
    case 'categories':
      res.push(<MenuItem value={0} key={0} primaryText={'Name'} />);
      break;
    case 'currencies':
      res.push(<MenuItem value={0} key={0} primaryText={'Name'} />);
      break;
    case 'suppliers':
      res.push(<MenuItem value={0} key={0} primaryText={'Name'} />);
      res.push(<MenuItem value={1} key={1} primaryText={'Address'} />);
      res.push(<MenuItem value={2} key={2} primaryText={'Telephone'} />);
      break;
    default: break;
  }
  return res;
};

exports.filters = (arr, activeContent, filtering, searchBy) => {
  if (!filtering) return arr;

  switch (activeContent.value) {
    case 'products':
      return arr.filter(product => {
        let res = true;

        switch (searchBy) {
          case 0: res = product.name.match(new RegExp(filtering, 'i')); break;
          case 1: res = product.vendorCode.match(new RegExp(filtering, 'i')); break;
          case 3: res = product.price.toString().match(new RegExp(filtering, 'i')); break;
          case 2: res = product.category.name.match(new RegExp(filtering, 'i')); break;
          case 4: res = product.currency.name.match(new RegExp(filtering, 'i')); break;
          default: res = true;
        }
        return res;
      });
    case 'categories':
      return arr.filter(category => {
        let res = true;

        switch (searchBy) {
          case 0: res = category.name.match(new RegExp(filtering, 'i')); break;
          default: res = true;
        }
        return res;
      });
    case 'currencies':
      return arr.filter(currency => {
        let res = true;

        switch (searchBy) {
          case 0: res = currency.name.match(new RegExp(filtering, 'i')); break;
          default: res = true;
        }
        return res;
      });
    case 'suppliers':
      return arr.filter(supplier => {
        let res = true;

        switch (searchBy) {
          case 0: res = supplier.name.match(new RegExp(filtering, 'i')); break;
          case 1: res = supplier.address.match(new RegExp(filtering, 'i')); break;
          case 2: res = supplier.telephone.match(new RegExp(filtering, 'i')); break;
          default: res = true;
        }
        return res;
      });
    default: break;
  }
};

exports.addFields = (data, itemData, handle, current) => {
  const { handleDropDownCategories, handleDropDownCurrencies } = handle;

  switch (data.activeContent.value) {
    case 'products': return getProductsField();
    case 'categories': return getCategoriesField();
    case 'currencies': return getCurrenciesField();
    case 'suppliers': return getSuppliersField();
    default: break;
  }

  function getProductsField() {
    const categories = data.data.categories.map((item, i) => {
      return <MenuItem value={item._id} key={i} primaryText={item.name} />;
    });
    const currencies = data.data.currencies.map((item, i) => {
      return <MenuItem value={item._id} key={i} primaryText={item.name} />;
    });

    const suppliers = data.data.suppliers.map((item, i) => {
      let isChecked = false;

      if (current) {
        // console.log(current.suppliers);
        current.suppliers.forEach(currItem => {
          if (item._id === currItem._id) {
            isChecked = true;
          }
        });
      }

      return (
        <div key={i}>
          <Divider />
          <ListItem
            leftCheckbox={<Checkbox ref={`supplierField${i}`} defaultChecked={isChecked}/>}
            primaryText={item.name}
            secondaryText={item.telephone}
          />
        </div>
      );
    });

    return (
      <div>
        <TextField
          // errorText='This field is required'
          floatingLabelText='Name'
          className='space-left-s'
          ref='nameField'
          defaultValue={current ? current.name : ''}
        />
        <br />
        <TextField
          // errorText='This field is required'
          floatingLabelText='Vendor Code'
          className='space-left-s'
          ref='vendorCodeField'
          defaultValue={current ? current.vendorCode : ''}
        />
        <br /><br />
        <DropDownMenu value={itemData.categoryBy} onChange={handleDropDownCategories}>
          {categories}
        </DropDownMenu>
        <br />
        <TextField
          // errorText='This field is required'
          floatingLabelText='Price'
          className='space-left-s'
          type='number'
          ref='priceField'
          defaultValue={current ? current.price : ''}
        />
        <DropDownMenu className='dropdown-xs' value={itemData.currencyBy} onChange={handleDropDownCurrencies}>
          {currencies}
        </DropDownMenu>
        <br />
        <Drawer open={false}>
          <List>
            <Subheader>Suppliers</Subheader>
            {suppliers}
          </List>
        </Drawer>
      </div>
    );
  }

  function getCategoriesField() {
    return (
      <div>
        <TextField
          // errorText='This field is required'
          floatingLabelText='Name'
          className='space-left-s'
          ref='nameField'
          defaultValue={current ? current.name : ''}
        />
      </div>
    );
  }

  function getCurrenciesField() {
    return (
      <div>
        <TextField
          // errorText='This field is required'
          floatingLabelText='Name'
          className='space-left-s'
          ref='nameField'
          defaultValue={current ? current.name : ''}
        />
      </div>
    );
  }

  function getSuppliersField() {
    const products = data.data.products.map((item, i) => {
      let isChecked = false;

      if (current) {
        current.products.forEach(currItem => {
          if (item._id === currItem._id) {
            isChecked = true;
          }
        });
      }

      return (
        <div key={i}>
          <Divider />
          <ListItem
            leftCheckbox={<Checkbox ref={`productField${i}`} defaultChecked={isChecked}/>}
            primaryText={item.name}
            secondaryText={item.vendorCode}
          />
        </div>
      );
    });

    return (
      <div>
        <TextField
          // errorText='This field is required'
          floatingLabelText='Name'
          className='space-left-s'
          ref='nameField'
          defaultValue={current ? current.name : ''}
        />
        <br />
        <TextField
          // errorText='This field is required'
          floatingLabelText='Address'
          className='space-left-s'
          ref='addressField'
          defaultValue={current ? current.address : ''}
        />
        <br />
        <TextField
          // errorText='This field is required'
          floatingLabelText='Telephone'
          className='space-left-s'
          ref='telephoneField'
          defaultValue={current ? current.telephone : ''}
        />
        <br />
        <Drawer open={false}>
          <List>
            <Subheader>Products</Subheader>
            {products}
          </List>
        </Drawer>
      </div>
    );
  }
};

exports.addItems = (context) => {
  switch (context.props.activeContent.value) {
    case 'products': addProduct(); break;
    case 'categories': addCategory(); break;
    case 'currencies': addCurrency(); break;
    case 'suppliers': addSupplier(); break;
    default: break;
  }

  function addProduct() {
    const checkedSuppliers = [];

    context.props.data.suppliers.forEach((item, i) => {
      if (context.refs[`supplierField${i}`].state.switched) {
        checkedSuppliers.push(item._id);
      }
    });

    const newProduct = {
      name: document.getElementById(context.refs.nameField.uniqueId).value,
      vendorCode: document.getElementById(context.refs.vendorCodeField.uniqueId).value,
      category: context.state.itemData.categoryBy,
      price: +document.getElementById(context.refs.priceField.uniqueId).value,
      currency: context.state.itemData.currencyBy,
      suppliers: checkedSuppliers
    };

    context.props.addProduct(newProduct)
      .then(context.setState({ feedback: true, feedbackMsg: 'Complete!' }))
      .catch(err => {
        // console.log(err.response.data.message);
        if (err) context.setState({ feedbackMsg: 'Failed!' });
      });
  }

  function addCategory() {
    const newCategory = {
      name: document.getElementById(context.refs.nameField.uniqueId).value
    };

    context.props.addCategory(newCategory)
      .then(context.setState({ feedback: true, feedbackMsg: 'Complete!' }))
      .catch(err => {
        // console.log(err.response.data.message);
        if (err) context.setState({ feedbackMsg: 'Failed!' });
      });
  }

  function addCurrency() {
    const newCurrency = {
      name: document.getElementById(context.refs.nameField.uniqueId).value
    };

    context.props.addCurrency(newCurrency)
      .then(context.setState({ feedback: true, feedbackMsg: 'Complete!' }))
      .catch(err => {
        // console.log(err.response.data.message);
        if (err) context.setState({ feedbackMsg: 'Failed!' });
      });
  }

  function addSupplier() {
    const checkedProducts = [];

    context.props.data.products.forEach((item, i) => {
      if (context.refs[`productField${i}`].state.switched) {
        checkedProducts.push(item._id);
      }
    });

    const newSupplier = {
      name: document.getElementById(context.refs.nameField.uniqueId).value,
      address: document.getElementById(context.refs.addressField.uniqueId).value,
      telephone: document.getElementById(context.refs.telephoneField.uniqueId).value,
      products: checkedProducts
    };

    context.props.addSupplier(newSupplier)
      .then(context.setState({ feedback: true, feedbackMsg: 'Complete!' }))
      .catch(err => {
        // console.log(err.response.data.message);
        if (err) context.setState({ feedbackMsg: 'Failed!' });
      });
  }
};

exports.editItems = (context) => {
  switch (context.props.activeContent.value) {
    case 'products': editProduct(); break;
    case 'categories': editCategory(); break;
    case 'currencies': editCurrency(); break;
    default: break;
  }

  function editProduct() {
    const checkedSuppliers = [];

    context.props.data.data.suppliers.forEach((item, i) => {
      if (context.refs[`supplierField${i}`].state.switched) {
        checkedSuppliers.push(item._id);
      }
    });

    const editingProduct = {
      _id: context.props.currentItem._id,
      name: document.getElementById(context.refs.nameField.uniqueId).value,
      vendorCode: document.getElementById(context.refs.vendorCodeField.uniqueId).value,
      category: context.state.itemData.categoryBy,
      price: +document.getElementById(context.refs.priceField.uniqueId).value,
      currency: context.state.itemData.currencyBy,
      suppliers: checkedSuppliers
    };

    context.props.editProduct(editingProduct)
      .then(context.setState({ feedback: true, feedbackMsg: 'Complete!' }))
      .catch(err => {
        // console.log(err.response.data.message);
        if (err) context.setState({ feedbackMsg: 'Failed!' });
      });
  }

  function editCategory() {
    const editingCategory = {
      _id: context.props.currentItem._id,
      name: document.getElementById(context.refs.nameField.uniqueId).value
    };

    context.props.editCategory(editingCategory)
      .then(context.setState({ feedback: true, feedbackMsg: 'Complete!' }))
      .catch(err => {
        // console.log(err.response.data.message);
        if (err) context.setState({ feedbackMsg: 'Failed!' });
      });
  }

  function editCurrency() {
    const editingCurrency = {
      _id: context.props.currentItem._id,
      name: document.getElementById(context.refs.nameField.uniqueId).value
    };

    context.props.editCurrency(editingCurrency)
      .then(context.setState({ feedback: true, feedbackMsg: 'Complete!' }))
      .catch(err => {
        // console.log(err.response.data.message);
        if (err) context.setState({ feedbackMsg: 'Failed!' });
      });
  }
};

exports.deleteItems = (context) => {
  switch (context.props.activeContent.value) {
    case 'products': deleteProduct(); break;
    case 'categories': deleteCategory(); break;
    case 'currencies': deleteCurrency(); break;
    default: break;
  }

  function deleteProduct() {
    const deletingProduct = {
      _id: context.props.data._id
    };

    context.props.deleteProduct(deletingProduct)
      .then(context.setState({ feedback: true, feedbackMsg: 'Complete!' }))
      .catch(err => {
        // console.log(err.response.data.message);
        if (err) context.setState({ feedbackMsg: 'Failed!' });
      });
  }

  function deleteCategory() {
    const deletingCategory = {
      _id: context.props.data._id
    };

    context.props.deleteCategory(deletingCategory)
      .then(context.setState({ feedback: true, feedbackMsg: 'Complete!' }))
      .catch(err => {
        // console.log(err.response.data.message);
        if (err) context.setState({ feedbackMsg: 'Failed!' });
      });
  }

  function deleteCurrency() {
    const deletingCurrency = {
      _id: context.props.data._id
    };

    context.props.deleteCurrency(deletingCurrency)
      .then(context.setState({ feedback: true, feedbackMsg: 'Complete!' }))
      .catch(err => {
        // console.log(err.response.data.message);
        if (err) context.setState({ feedbackMsg: 'Failed!' });
      });
  }
};