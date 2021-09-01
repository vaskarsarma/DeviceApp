/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import React, { useContext } from 'react';
import { isEmpty } from 'lodash';
import Device from './Device';
import { deleteDevice, addDeviceTemperature, delDeviceTemperatureStats } from '../api';
import DevicesContext from '../context/DevicesContext';

const DevicesList = () => {
  const { devices, setDevices } = useContext(DevicesContext);

  const handleRemoveDevice = (_id) => {
    const deviceId = _id;
    deleteDevice(_id).then((_) => {
      delDeviceTemperatureStats(_.msg._id).then((results) => {
        setDevices(devices.filter((device) => device._id !== deviceId));
      });
    });
  };

  const handleAddDeviceStats = (_id, name) => {
    const tempStats = {
      name,
      deviceId: { _id },
      temperature: Math.floor(Math.random() * 100) + 1, // Generate random number from 1 to 100
    };
    addDeviceTemperature(tempStats).then((_) => {
      setDevices([...devices]);
    });
  };

  return (
    <React.Fragment>
      <div className="device-list">
        {!isEmpty(devices) ? (
          devices.map((device) => (
            <Device
            key={device._id} {...device}
            handleRemoveDevice={handleRemoveDevice}
            handleAddDeviceStats={handleAddDeviceStats}
            />
          ))
        ) : (
          <p className="message">No devices available. Please add some device.</p>
        )}
      </div>
    </React.Fragment>
  );
};

export default DevicesList;
