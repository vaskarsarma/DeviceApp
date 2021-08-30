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
    }
    //this.onHandleChange=this.onHandleChange.bind(this);
  }

  componentDidMount() {
    getDeviceTemperatureStats(this.state.recordCount).then((results) => {
      console.log(results);
      console.log(results.length);
      if (results !== null) {
        this.setState({
          deviceStats: results,
          count: results.length
        });
      }
    });

    // Open Socket connection with Server
    const apidomain = process.env.REACT_APP_APIDOMAIN;
    const socket = openSocket(apidomain);
    socket.on('addtempstats', data => {
      if (data.action === 'add') {
        console.log("Update tempurature stats triggered");
        this.addStats(data.deviceStat);
      }
    })
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

        {/* <select defaultValue={this.state.recordCount} onChange={this.onHandleChange}>
      <option value="default" disabled hidden>
        Choose Transaction Counts
      </option>
      <option value="5">5</option>
      <option selected  value="10">10</option>
      <option value="20">20</option>
    </select> */}

        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Device Name</th>
              <th scope="col">Transaction Count</th>
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

    return (
      <React.Fragment>
        <div className="device-stats-list">
          {deviceInfo}
        </div>
      </React.Fragment>
    );
  }
}

