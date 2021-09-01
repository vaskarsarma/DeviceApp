/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import DeviceForm from './DeviceForm';
import { editDevice } from '../api';
import DevicesContext from '../context/DevicesContext';

const EditDevice = ({ history }) => {
  const { devices, setDevices } = useContext(DevicesContext);
  const { _id: deviceId } = useParams();
  const deviceToEdit = devices.find((device) => device._id === deviceId);

  const handleOnSubmit = ({ _id, ...device }) => {
    editDevice(deviceId, device).then((results) => {
      const filteredDevices = devices.reduce((prevD, nextD) => {
        if (nextD._id === deviceId) {
          prevD.push(results);
        } else {
          prevD.push(nextD);
        }
        return prevD;
      }, []);
      setDevices(filteredDevices);
      history.push('/');
    });
  };

  return (
    <div>
      <DeviceForm device={deviceToEdit} handleOnSubmit={handleOnSubmit} />
    </div>
  );
};

export default EditDevice;
