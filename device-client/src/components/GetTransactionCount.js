import React, { Component } from 'react';
import { getTransactionCount } from "../api";
import { Form, Button } from 'react-bootstrap';
import openSocket from 'socket.io-client';
import { formatDate } from '../utils/utils';

export default class GetTransactionCount extends Component {

  constructor() {
    super();
    this.state = {
      transactionInfo: [],
      count: 0,
      fromDate: '2021-08-27',
      toDate: formatDate(new Date()),
    }
  }

  componentDidMount() {
    this.getTransactions();

    // Open Socket connection with Server
    const apidomain = window._env_.REACT_APP_APIDOMAIN;
    const socket = openSocket(apidomain);
    socket.on('addtempstats', data => {
      if (data.action === 'add') {
        console.log("Update temperature stats triggered");
        this.getTransactions();
      }
    })
  }

  handleOnSubmit = (e) => {
    e.preventDefault();
    console.log("Clicked the submit");
    this.getTransactions();
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
    console.log(`Updated : ${e.target.name}, ${e.target.value}`);
  }

  getTransactions() {
    getTransactionCount(this.state.fromDate, this.state.toDate).then((results) => {
      if (results !== null) {
        this.setState({
          transactionInfo: results,
          count: results.length
        });
      }
    });
  }

  render() {
    let transactionInfo = (<p>View max/min transactions count filtered by DataRange</p>);

    if (this.state.count > 0) {
      transactionInfo = (<div>
        <p>View max/min transactions count filtered by DataRange</p>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Device Name</th>
              <th scope="col">Transaction Count</th>
            </tr>
          </thead>
          <tbody>
            {this.state.transactionInfo.map((p, i) => {
              return (
                <tr key={p._id} dataid={p._id}>
                  <th scope="row">{(i === 0) ? 'Device with max transactions' : 'Device with min transactions'}</th>
                  <td>{p._id}</td>
                  <td>{p.count}</td>
                </tr>
              )
            })
            }
          </tbody>
        </table>
      </div>
      )
    }

    return (
      <React.Fragment>
        <Form onSubmit={this.handleOnSubmit} className="form-inline">
          <Form.Group controlId="fromDate" className="form-group mb-2">
            <Form.Label className="sr-only">From</Form.Label>
            <Form.Control
              className="form-control"
              type="Date"
              name="fromDate"
              value={this.state.fromDate}
              placeholder="Enter from date"
              required={true}
              onChange={this.handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="toDate" className="form-group mb-2">
            <Form.Label className="sr-only">To</Form.Label>
            <Form.Control
              className="form-control"
              type="Date"
              name="toDate"
              value={this.state.toDate}
              placeholder="Enter to date"
              required={true}
              onChange={this.handleInputChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="btn btn-primary mb-2">
            Submit
          </Button>
        </Form>
        <div className="device-stats-list">
          {transactionInfo}
        </div>
      </React.Fragment>
    );
  }
}

