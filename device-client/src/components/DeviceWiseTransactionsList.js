import React, { Component } from 'react';
import { getDeviceTemperatureStats } from "../api";
import DeviceStats from "./DeviceStats";
import openSocket from 'socket.io-client';

export default class DeviceWiseTransactionsList extends Component {

  constructor() {
    super();
    this.state = {
      deviceStats: [],
      count: 0,
      recordCount: 10,
      isError: false,
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
        this.addStats(data.deviceStat);
      }
    });

    socket.on('deletetempstats', data => {
      if (data.action === 'delete') {
        console.log("Update temperature stats triggered");
        this.getTransactions();
      }
    });
  }

  getTransactions() {
    getDeviceTemperatureStats(this.state.recordCount).then((results) => {
      if (results !== null) {
        this.setState({
          deviceStats: results,
          count: results.length,
          isError: false,
        });
      }
      else {
        this.setState({
          isError: true
        });
      }
    });
  }

  addStats = deviceStat => {
    this.setState(prevState => {
      const updatedDeviceStats = [...prevState.deviceStats];
      if (prevState.deviceStats.length === this.state.recordCount) {
        updatedDeviceStats.pop();
      }
      updatedDeviceStats.unshift(deviceStat);
      return {
        deviceStats: updatedDeviceStats,
      }
    });
  }

  render() {
    let deviceInfo = (<p>View transactions</p>);

    if (this.state.count > 0) {
      deviceInfo = (<div>
        <p>View top {this.state.recordCount} transactions</p>

        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Device Name</th>
              <th scope="col">Temperature</th>
              <th scope="col">Transaction Date</th>
            </tr>
          </thead>
          <tbody>
            <DeviceStats deviceStats={this.state.deviceStats} />
          </tbody>
        </table>
      </div>
      )
    }

    if (this.state.isError) {
      deviceInfo = (<p className="errorMsg"p>OOPS!!!Please try again later.</p>);
    }

    return (
      <React.Fragment>
        <div className="device-stats-list">
          {deviceInfo}
        </div>
      </React.Fragment>
    );
  }
}

