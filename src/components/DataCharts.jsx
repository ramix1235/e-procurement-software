import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Label } from 'recharts';

const propTypes = {
  data: PropTypes.object
};

export default class DataCharts extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const data = [];

    this.props.data.suppliers.forEach(supplier => {
      data.push({
        name: supplier.name,
        amount: supplier.products.length
      });
    });

    return (
      <div>
        <Card>
          <CardTitle title='Amount of products in suppiers' />
          <CardText>
            <BarChart width={400} height={300} data={data}>
              <XAxis dataKey='name'>
                <Label value='Suppliers' position='insideBottom' />
              </XAxis>
              <YAxis>
                <Label value='Amount' angle={-90} position='insideLeft' />
              </YAxis>
              <CartesianGrid strokeDasharray='3 3'/>
              <Tooltip/>
              <Bar dataKey='amount' fill='#8884d8' />
            </BarChart>
          </CardText>
          <CardActions>
            <FlatButton label='Save' />
            <FlatButton label='Print' />
          </CardActions>
        </Card>
      </div>
    );
  }
}

DataCharts.propTypes = propTypes;