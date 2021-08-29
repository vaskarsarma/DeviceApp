import React, { useContext } from 'react';
import { isEmpty, random } from 'lodash';
import Device from './Device';
import { deleteDevice, addDeviceTemperature } from '../api'
import DevicesContext from '../context/DevicesContext';

const DevicesList = () => {
  const { devices, setDevices } = useContext(DevicesContext);

  const handleRemoveDevice = (_id) => {
    deleteDevice(_id).then(_ => {
      setDevices(devices.filter((device) => device._id !== _id));
    })
  };

  const handleAddDeviceStats = (_id, name) => {
    const tempStats = {
      name: name,
      deviceId: { '_id': _id },
      temperature: Math.floor(Math.random() * 100) + 1, // Generate random number from 1 to 100
    }
    addDeviceTemperature(tempStats).then(_ => {
      setDevices([...devices]);
    })
  };

  return (
    <React.Fragment>
      <div className="device-list">
        {!isEmpty(devices) ? (
          devices.map((device) => (
            <Device key={device._id} {...device} handleRemoveDevice={handleRemoveDevice} handleAddDeviceStats={handleAddDeviceStats} />
          ))
        ) : (
          <p className="message">No devices available. Please add some device.</p>
        )}
      </div>
    </React.Fragment>
  );
};

export default DevicesList;
