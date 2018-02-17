import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';

export default class EditItem extends Component {
  render() {
    return (
      <div className='element-inline'>
        <FlatButton label='Edit'/>
      </div>
    );
  }
}