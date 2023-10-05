import axios, { AxiosRequestConfig } from "axios";
const baseUrl = process.env.VUE_APP_API;

const config = {
  address: baseUrl,
  port: "",
  basePath: "",
  axiosConfig: {
    baseURL: baseUrl,
    headers: {},
    withCredentials: false,
    crossDomain: true,
    timeout: 60000,
  },
  getEndpointUrl() {
    return this.address + (this.basePath ? this.basePath : "");
  },
};

const $http = axios.create(config.axiosConfig);

const sendPostNoToken = async (url: string, payload: object, headers = null) => {
  try {
    const response = await $http.post(url, payload, { timeout: 600000 });
    return response;
  } catch (e: any) {
    if (e.response) {
      return e.response;
    } else if (e.toString().includes("Network Error")) {
      return "NETWORK_ERROR";
    } else {
      return null;
    }
  }
};

const sendGetNoToken = async (url: string, params = {}, headers = null) => {
    try {
      const response = await $http.get(url, { params, timeout: 600000 });
      return response;
    } catch (e: any) {
      if (e.response) {
        return e.response;
      } else if (e.toString().includes("Network Error")) {
        return "NETWORK_ERROR";
      } else {
        return null;
      }
    }
};

export {
  sendPostNoToken,
  sendGetNoToken,
};
