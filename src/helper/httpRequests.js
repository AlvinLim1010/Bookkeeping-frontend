const axios = require("axios");

const AwesomeNotifications = require('awesome-notifications').default;
// Initialize AwesomeNotifications
const awn = new AwesomeNotifications();

module.exports = {
  axiosRequest,
  axiosGetRequest,
  awn 
};

async function axiosRequest(method, url, route, body) {
  var host = new URL(url + route);

  try {
    const response = await axios({
      method: method,
      url: host,
      data: body
    });
    if (response != null) {
      awn.success("Requests handled successfully");
      return response;
    }
  } catch (error) {
    if (error.response) {
      awn.alert("Client Error: " + JSON.stringify(error.response.data));;
      return error.response;
    }
    
    awn.alert("Network Error: " + JSON.stringify(error.config.url));
    return error.response;
  }
}

async function axiosGetRequest(url, route, params = {}) {
  const host = new URL(route, url);

  try {
    const response = await axios({
      method: 'GET',
      url: host.href,
      params: params, // Include params for GET requests
    });
    if (response != null) {
      awn.success("Requests handled successfully");
      return response;
    }
  } catch (error) {
    if (error.response) {
      awn.alert("Client Error: " + JSON.stringify(error.response.data));
      return error.response;
    }
    awn.alert("Network Error: " + JSON.stringify(error.config.url));
    return error.response;
  }
}
