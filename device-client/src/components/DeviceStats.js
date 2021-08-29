/* eslint-disable array-callback-return */
import React from 'react';

const DeviceStats = (props) => {
    return (
        props.deviceStats.map((p, index) => {
            return (
                <tr key={p._id} dataid={p._id}>
                    <th scope="row"></th>
                    <td>{p.name}</td>
                    <td>{p.temperature}</td>
                    <td>{p.created_at}</td>
                </tr>
            )
        })
    )
}

export default DeviceStats;