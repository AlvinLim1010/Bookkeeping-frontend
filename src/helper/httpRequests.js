const axios = require("axios");

async function axiosRequest(method, url, route, body = null, header = false) {
    var host = new URL(url + route);
    var authServerLoginAuthorization = {
      Authorization: `Basic ${Buffer.from(
        `${getClientID()}:${getClientSecret()}`
      ).toString("base64")}`,
    };
  
    const headers =
      header === false ? getRequestHeader() : authServerLoginAuthorization;
  
    try {
      const response = await axios({
        method: method,
        url: host,
        data: body,
        headers: headers,
      });
  
      if (response != null) {
        // 200 range
        return response;
      }
    } catch (error) {
      if (error.response) {
        // 400-500 range
        console.error("Client Error:", JSON.stringify(error.response));
        return error.response;
      }
  
      // Request made, but no response received , error response is undefined
      console.error("Network Error:", JSON.stringify(error.config.url));
      return error.response;
    }
  }