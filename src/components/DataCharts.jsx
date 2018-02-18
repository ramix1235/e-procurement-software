import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import ReactToPrint from 'react-to-print';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Label, PieChart, Pie, Cell } from 'recharts';

const propTypes = {
  data: PropTypes.object
};

export default class DataCharts extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    const numberOfProductsFromSuppliers = [];
    const productCategories = [];

    this.props.data.suppliers.forEach(supplier => {
      numberOfProductsFromSuppliers.push({
        name: supplier.name,
        amount: supplier.products.length
      });
    });
    this.props.data.categories.forEach(category => {
      productCategories.push({
        name: category.name,
        amount: 0
      });
    });
    this.props.data.products.forEach(product => {
      productCategories.forEach(item => {
        if (item.name === product.category.name) {
          /* eslint-disable */
          item.amount++;
          /* eslint-enable*/
        }
      });
    });

    return (
      <div>
        <Card>
          <CardTitle title='Number of products from suppliers' />
          <CardText>
            <BarChart width={400} height={300} data={numberOfProductsFromSuppliers} ref={el => (this.barChart = el)}>
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
            <ReactToPrint trigger={() => <FlatButton label='Print' />} content={() => this.barChart}/>
          </CardActions>
        </Card>
        <Card className='space-top-xs2'>
          <CardTitle title='Product categories' />
          <CardText>
            <PieChart width={400} height={300} ref={el => (this.pieChart = el)}>
              <Pie dataKey='amount' data={productCategories} cx={200} cy={130} innerRadius={50} outerRadius={100} fill='#8884d8' label>
                {productCategories.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]}/>)}
              </Pie>
              <Tooltip/>
            </PieChart>
          </CardText>
          <CardActions>
            <ReactToPrint trigger={() => <FlatButton label='Print' />} content={() => this.pieChart}/>
          </CardActions>
        </Card>
      </div>
    );
  }
}

DataCharts.propTypes = propTypes;