import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const DeviceForm = (props) => {
  const [device, setDevice] = useState(() => {
    return {
      name: props.device ? props.device.name : '',
      type: props.device ? props.device.type : '',
    };
  });

  const [errorMsg, setErrorMsg] = useState('');
  const { name, type } = device;

  const handleOnSubmit = (event) => {
    event.preventDefault();
    const values = [name, type];
    let errorMsg = '';

    const allFieldsFilled = values.every((field) => {
      const value = `${field}`.trim();
      return value !== '' && value !== '0';
    });

    if (allFieldsFilled) {
      const device = {
        name,
        type,
      };
      props.handleOnSubmit(device);
    } else {
      errorMsg = 'Please fill out all the fields.';
    }
    setErrorMsg(errorMsg);
  };

  const handleInputChange = (event) => {
    const { name: _name, value } = event.target;
    setDevice((prevState) => ({
      ...prevState,
      [_name]: value
    }));
  };

  return (
    <div className="main-form">
      {errorMsg && <p className="errorMsg">{errorMsg}</p>}
      <Form onSubmit={handleOnSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Device Name</Form.Label>
          <Form.Control
            className="input-control"
            type="text"
            name="name"
            value={name}
            placeholder="Enter name of device"
            required={true}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="type">
          <Form.Label>Device Type</Form.Label>
          <Form.Control
            className="input-control"
            type="text"
            name="type"
            value={type}
            placeholder="Enter type of the Device"
            required={true}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="submit-btn">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default DeviceForm;
