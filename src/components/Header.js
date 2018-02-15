import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import { Tabs, Tab } from 'material-ui/Tabs';
import DataTable from './DataTable';

export default class Header extends Component {
  render() {
    return (
      <div>
        <AppBar
          title='Friendly Suppliers'
          iconStyleLeft={{ display: 'none' }}
        />
        <Tabs className='space-top-xs'>
          <Tab label='Products'>
            <DataTable/>
          </Tab>
          <Tab label='Suppliers'>
          </Tab>
          <Tab label='Orders'>
          </Tab>
        </Tabs>
      </div>
    );
  }
}