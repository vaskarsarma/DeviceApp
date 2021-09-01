/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import DeviceForm from './DeviceForm';
import DevicesContext from '../context/DevicesContext';
import { addDevice } from '../api';

const AddDevice = ({ history }) => {
  const { devices, setDevices } = useContext(DevicesContext);

  const handleOnSubmit = (device) => {
    addDevice(device).then((results) => {
      setDevices([...devices, results]);
      history.push('/');
    });
  };

  return (
    <React.Fragment>
      <DeviceForm handleOnSubmit={handleOnSubmit} />
    </React.Fragment>
  );
};

export default AddDevice;
