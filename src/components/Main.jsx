import React, { Component } from 'react';
import './App.css';
import AppBar from 'material-ui/AppBar';
import { Tabs, Tab } from 'material-ui/Tabs';
import ActiveContent from './ActiveContent';

export default class Main extends Component {
  render() {
    return (
      <div>
        <AppBar
          title='Friendly Suppliers'
          iconStyleLeft={{ display: 'none' }}
        />
        <Tabs className='space-top-xs'>
          <Tab label='Inventory'>
            <ActiveContent/>
          </Tab>
          <Tab label='Charts'>
          </Tab>
          <Tab label='Orders'>
          </Tab>
        </Tabs>
      </div>
    );
  }
}