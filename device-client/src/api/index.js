/* eslint-disable no-underscore-dangle */
const axios = require('axios');

const apidomain = window._env_.REACT_APP_APIDOMAIN;

export function addDevice(body) {
  return axios.post(`${apidomain}/devices/add`, body)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
    });
}

export function editDevice(_id, filter) {
  return axios.put(`${apidomain}/devices/update/${_id}`, filter)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
    });
}

export function deviceList() {
  return axios.get(`${apidomain}/devices/list`)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
    });
}

export function deleteDevice(_id) {
  return axios.delete(`${apidomain}/devices/del/${_id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
    });
}

export function addDeviceTemperature(body) {
  return axios.post(`${apidomain}/devices/stats/add`, body)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
    });
}

export function getDeviceTemperatureStats(recCount) {
  return axios.get(`${apidomain}/devices/stats/list/${recCount}`)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
    });
}

export function getTransactionCount(fromDate, toDate) {
  return axios.get(`${apidomain}/devices/stats/transactionlist/${fromDate}/${toDate}`)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
    });
}

export function delDeviceTemperatureStats(deviceID) {
  return axios.delete(`${apidomain}/devices/stats/del/${deviceID}`)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
    });
}
