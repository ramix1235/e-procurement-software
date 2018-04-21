import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Tabs, Tab } from 'material-ui/Tabs';

import { TABS_TYPES } from '@constants/tabs';

export default class Main extends Component {
  state = {
    activeTab: TABS_TYPES.INVENTORY,
  }

  componentWillMount() {
    this.updateTabData();
  }

  componentDidUpdate(prevProps, prevState) {
    this.updateTabData();
  }

  handleOnChangeTabs = (tab) => {
    this.setState({ activeTab: tab });
    localStorage.setItem('activeTab', tab);
  }

  updateTabData = () => {
    const { activeTab } = this.state;
    let tab = localStorage.getItem('activeTab');

    if (!tab) {
      tab = TABS_TYPES.INVENTORY;
    }

    if (activeTab !== tab) {
      this.setState({ activeTab: tab });
    }
  }

  render() {
    const { activeTab } = this.state;

    return (
      <Tabs className="m-t-3" onChange={this.handleOnChangeTabs} value={activeTab}>
        <Tab value="inventory" label="Inventory" containerElement={<Link to="/inventory" href />} />
        <Tab value="charts" label="Charts" containerElement={<Link to="/charts" href />} />
        <Tab value="orders" label="Orders" containerElement={<Link to="/orders" href />} />
      </Tabs>
    );
  }
}
