const axios = require('axios');

const apidomain = process.env.REACT_APP_APIDOMAIN;
console.log("Device-client >> ", apidomain);

export function addDevice(body) {
  return axios.post(`${apidomain}/devices/add`, body)
    .then(function (response) {
      console.log(response.data);
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

}

export function editDevice(_id, filter) {
  return axios.put(`${apidomain}/devices/update/${_id}`, filter)
    .then(function (response) {
      console.log(response);
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

}
export function deviceList(body) {
  return axios.get(`${apidomain}/devices/list`)
    .then(function (response) {
      console.log(response);
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    })

}
export function deleteDevice(_id) {
  return axios.delete(`${apidomain}/devices/del/${_id}`)
    .then(function (response) {
      console.log(response);
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}

export function addDeviceTemperature(body) {
  console.log(body);
  return axios.post(`${apidomain}/devices/stats/add`, body)
    .then(function (response) {
      console.log(response.data);
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}

export function getDeviceTemperatureStats(recCount) {
  console.log(recCount);
  return axios.get(`${apidomain}/devices/stats/list/${recCount}`)
    .then(function (response) {
      console.log(response);
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    })

}

export function getTransactionCount(fromDate, toDate) {
  console.log(fromDate, toDate);
  return axios.get(`${apidomain}/devices/stats/transactionlist/${fromDate}/${toDate}`)
    .then(function (response) {
      console.log(response);
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    })

}