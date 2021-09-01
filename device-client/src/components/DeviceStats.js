/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
import React from 'react';

const DeviceStats = (props) => (
  props.deviceStats.map((p, index) => (
                <tr key={p._id} dataid={p._id}>
                    <th scope="row"></th>
                    <td>{p.name}</td>
                    <td>{p.temperature}</td>
                    <td>{p.created_at}</td>
                </tr>
  ))
);

export default DeviceStats;
