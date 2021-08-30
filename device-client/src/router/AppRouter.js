import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';
import AddDevice from '../components/AddDevice';
import DevicesList from '../components/DevicesList';
import { deviceList } from '../api';
import EditDevice from '../components/EditDevice';
import DevicesContext from '../context/DevicesContext';
import DeviceWiseTransactionsList from '../components/DeviceWiseTransactionsList';
import GetTransactionCount from '../components/GetTransactionCount';
import openSocket from 'socket.io-client';

const AppRouter = () => {

  const [devices, setDevices] = useState([]);

  useEffect(() => {
    deviceList().then((results) => {
      console.log(results);
      setDevices(results);
    })
  }, []);

  // Open Socket connection with Server
  const apidomain = process.env.REACT_APP_APIDOMAIN;
  const socket = openSocket(apidomain);
  socket.on('managedevice', data => {
    if (data.action === 'add' || data.action === 'update' || data.action === 'delete') {
      console.log("New device added");
      deviceList().then((results) => {
        console.log(results);
        setDevices(results);
      })
    }
  })

  return (
    <BrowserRouter>
      <div>
        <Header />
        <div className="main-content">
          <DevicesContext.Provider value={{ devices, setDevices }}>
            <Switch>
              <Route component={GetTransactionCount} path="/" exact={true} />
              <Route component={DeviceWiseTransactionsList} path="/transactions" />
              <Route component={DevicesList} path="/list" />
              <Route component={AddDevice} path="/add" />
              <Route component={EditDevice} path="/edit/:_id" />
              <Route component={() => <Redirect to="/" />} />
            </Switch>
          </DevicesContext.Provider>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default AppRouter;
