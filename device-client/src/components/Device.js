import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const Device = ({
  _id,
  name,
  type,
  handleRemoveDevice,
  handleAddDeviceStats,
}) => {
  const history = useHistory();

  return (
    <Card key={_id} style={{ width: '18rem' }} className="device">
      <Card.Body>
        <Card.Title className="device-title">{name}</Card.Title>
        <div className="device-details">
          <div>Device Type: {type}</div>
        </div>
        <div>
          <Button variant="primary" onClick={() => history.push(`/edit/${_id}`)}>
            Edit
          </Button>{' '}
          <Button variant="danger" onClick={() => handleRemoveDevice(_id)}>
            Delete
          </Button>
          </div>
          <div className="device-details">
          <Button variant="warning" onClick={() => handleAddDeviceStats(_id, name)}>
            Check Temperature
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Device;
