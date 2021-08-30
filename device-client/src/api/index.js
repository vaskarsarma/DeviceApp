const axios = require('axios');

const apidomain = window._env_.REACT_APP_APIDOMAIN;

export function addDevice(body) {
  return axios.post(`${apidomain}/devices/add`, body)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}

export function editDevice(_id, filter) {
  return axios.put(`${apidomain}/devices/update/${_id}`, filter)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}

export function deviceList(body) {
  return axios.get(`${apidomain}/devices/list`)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}

export function deleteDevice(_id) {
  return axios.delete(`${apidomain}/devices/del/${_id}`)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}

export function addDeviceTemperature(body) {
  return axios.post(`${apidomain}/devices/stats/add`, body)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}

export function getDeviceTemperatureStats(recCount) {
  return axios.get(`${apidomain}/devices/stats/list/${recCount}`)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}

export function getTransactionCount(fromDate, toDate) {
  return axios.get(`${apidomain}/devices/stats/transactionlist/${fromDate}/${toDate}`)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}