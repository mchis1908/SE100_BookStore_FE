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

$http.interceptors.request.use(
  async (axiosConfig: any) => {
    const sessionTokens = JSON.parse(localStorage.getItem("sessionTokens")!);
    if (sessionTokens) {
      axiosConfig.headers["authorization"] =
        "Bearer " + sessionTokens;
    } else {
      return;
    }

    return axiosConfig;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

const sendPostOnce = async (url: string, payload: object, headers = null) => {
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

const sendDeleteOnce = async (url: string, payload: object, headers = null) => {
  try {
    const response = await $http.delete(url, {data: payload});
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

const sendPutOnce = async (url: string, payload: object, headers = null) => {
  try {
    const response = await $http.put(url, payload, { timeout: 600000 });
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

const sendGetOnce = async (url: string, params = {}, headers = null) => {
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

const sendGetPath = async (url: string, params: any = {}, headers = null) => {
  try {
    const path: any = params["path"];
    const response = await $http.get(url + `/${path}`, { timeout: 600000 });
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

const sendDeletePath = async (
  url: string,
  params: any = {},
  headers = null
) => {
  try {
    const path: any = params["path"];
    const response = await $http.delete(url + `/${path}`, { timeout: 600000 });
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
  sendPostOnce,
  sendGetOnce,
  sendGetPath,
  sendPutOnce,
  sendDeletePath,
  sendDeleteOnce,
};
