import axios, { AxiosRequestConfig } from "axios";
import { MutationTypes } from "./mutation-types";
import {
  sendPostOnce,
  sendGetOnce,
  sendGetPath,
  sendPutOnce,
  sendDeletePath,
  sendDeleteOnce,
} from "@/services/api";
const devMode = false;

const turnOnDevMode = (payload: any) => {
  if (!devMode) {
    return payload;
  }
  const session = JSON.parse(localStorage.getItem("sessionTokens")!);
  const context = session;
  const bodyJson = { ...payload };
  payload = { context: context, "body-json": bodyJson };
  return payload;
};

import {
  sendPostNoToken,
  sendGetNoToken,
} from "@/services/apiNoToken";

const actions = {

  [MutationTypes.LOGIN_USER_REQUEST]: async (
    { commit }: { commit: any },
    payload: any
  ) => {
    payload = turnOnDevMode(payload);
    const response = await sendPostNoToken("/auth/signin", payload);
    if (response) {
      return response;
    } else {
      return null;
    }
  },

  [MutationTypes.GET_CURRENT_USER]: async (
    { commit }: { commit: any },
    payload: any
  ) => {
    payload = turnOnDevMode(payload);
    const response = await sendGetOnce("/user", payload);
    if (response) {
      return response;
    } else {
      return null;
    }
  },

  [MutationTypes.CREATE_CUSTOMER]: async (
    { commit }: { commit: any },
    payload: any
  ) => {
    payload = turnOnDevMode(payload);
    const response = await sendPostOnce("/manage/customer/create", payload);
    if (response) {
      return response;
    } else {
      return null;
    }
  },

  [MutationTypes.CREATE_EMPLOYEE]: async (
    { commit }: { commit: any },
    payload: any
  ) => {
    payload = turnOnDevMode(payload);
    const response = await sendPostOnce("/manage/employee/create", payload);
    if (response) {
      return response;
    } else {
      return null;
    }
  },

  [MutationTypes.CREATE_ADMIN]: async (
    { commit }: { commit: any },
    payload: any
  ) => {
    payload = turnOnDevMode(payload);
    const response = await sendPostOnce("/auth/signup", payload);
    if (response) {
      return response;
    } else {
      return null;
    }
  },

  [MutationTypes.GET_CUSTOMER]: async (
    { commit }: { commit: any },
    payload: any
  ) => {
    payload = turnOnDevMode(payload);
    const response = await sendGetOnce("/manage/customer", payload);
    if (response) {
      return response;
    } else {
      return null;
    }
  },

  [MutationTypes.GET_EMPLOYEE]: async (
    { commit }: { commit: any },
    payload: any
  ) => {
    payload = turnOnDevMode(payload);
    const response = await sendGetOnce("/manage/employee", payload);
    if (response) {
      return response;
    } else {
      return null;
    }
  },

  [MutationTypes.UPDATE_CUSTOMER]: async (
    { commit }: { commit: any },
    payload: any
  ) => {
    payload = turnOnDevMode(payload);
    const customer_id = payload.customer_id
    let newPayload = { ...payload };
    delete newPayload.customer_id;
    const response = await sendPutOnce(`/manage/customer/edit-info/${customer_id}`, newPayload);
    if (response) {
      return response;
    } else {
      return null;
    }
  },

  [MutationTypes.GET_ALL_BOOKS] : async (
    { commit }: { commit: any },
    payload: any
  ) => {
    payload = turnOnDevMode(payload);
    const response = await sendGetOnce("/book");

    if (response) {
      return response
    } else {
      return null
    }
  },

  [MutationTypes.GET_ALL_VOUCHERS] : async (
    { commit }: { commit: any },
    payload: any
  ) => {
    payload = turnOnDevMode(payload);
    const response = await sendGetOnce("/manage/voucher");

    if (response) {
      return response
    } else {
      return null
    }
  },

  [MutationTypes.UPDATE_A_BOOK] : async (
    { commit }: { commit: any },
    payload: any
  ) => {
    payload = turnOnDevMode(payload);
    const response = await sendPutOnce(`/manage/book/${payload.bookId}`, payload);

    if (response) {
      return response
    } else {
      return null
    }
  },

  [MutationTypes.CREATE_A_BOOK] : async (
    { commit }: { commit: any },
    payload: any
  ) => {
    payload = turnOnDevMode(payload);
    const response = await sendPostOnce(`/manage/book/create`, payload);

    if (response) {
      return response
    } else {
      return null
    }
  },

  [MutationTypes.GET_ALL_SALARY_SCALE] : async (
    { commit }: { commit: any },
    payload: any
  ) => {
    payload = turnOnDevMode(payload);
    const response = await sendGetOnce("/manage/salary-scale");

    if (response) {
      return response
    } else {
      return null
    }
  },

  [MutationTypes.UPDATE_EMPLOYEE] : async (
    { commit }: { commit: any },
    payload: any
  ) => {
    payload = turnOnDevMode(payload);
    const employee_id = payload.employee_id
    let newPayload = { ...payload };
    delete newPayload.employee_id;
    const response = await sendPutOnce(`/manage/employee/${employee_id}`, newPayload);
    if (response) {
      return response
    } else {
      return null
    }
  },

  [MutationTypes.DELETE_SCALE] : async (
    { commit }: { commit: any },
    payload: any
  ) => {
    payload = turnOnDevMode(payload);
    const response = await sendDeleteOnce(`/manage/salary-scale/${payload._id}`, payload);
    if (response) {
      return response
    } else {
      return null
    }
  },

  [MutationTypes.ADD_SCALE] : async (
    { commit }: { commit: any },
    payload: any
  ) => {
    payload = turnOnDevMode(payload);
    const response = await sendPostOnce(`/manage/salary-scale`, payload);
    if (response) {
      return response
    } else {
      return null
    }
  },

  [MutationTypes.GET_TOP_10_CUSTOMER] : async (
    { commit }: { commit: any },
    payload: any
  ) => {
    payload = turnOnDevMode(payload);
    const response = await sendGetOnce("/manage/customer/top-10");

    if (response) {
      return response
    } else {
      return null
    }
  },

  // [MutationTypes.GET_TOP_10_BOOK] : async (
  //   { commit }: { commit: any },
  //   payload: any
  // ) => {
  //   payload = turnOnDevMode(payload);
  //   const response = await sendGetOnce("/manage/customer/top-10", payload);

  //   if (response) {
  //     return response
  //   } else {
  //     return null
  //   }
  // },

  [MutationTypes.GET_ALL_INVOICES] : async (
    { commit }: { commit: any },
    payload: any
  ) => {
    payload = turnOnDevMode(payload);
    const response = await sendGetOnce("/invoice", payload);

    if (response) {
      return response
    } else {
      return null
    }
  },

  [MutationTypes.GET_DETAIL_INVOICE] : async (
    { commit }: { commit: any },
    payload: any
  ) => {
    payload = turnOnDevMode(payload);
    const response = await sendGetOnce(`/invoice/${payload.id}`);

    if (response) {
      return response
    } else {
      return null
    }
  },

  [MutationTypes.GET_EXPENSES] : async (
    { commit }: { commit: any },
    payload: any
  ) => {
    payload = turnOnDevMode(payload);
    const response = await sendGetOnce(`/manage/expense`,payload);

    if (response) {
      return response
    } else {
      return null
    }
  },
};

export default actions;
