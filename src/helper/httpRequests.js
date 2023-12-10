const axios = require("axios");

module.exports = {
  axiosRequest
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
      return response;
    }
  } catch (error) {
    if (error.response) {
      console.error("Client Error:", JSON.stringify(error.response));
      return error.response;
    }

    console.error("Network Error:", JSON.stringify(error.config.url));
    return error.response;
  }
}