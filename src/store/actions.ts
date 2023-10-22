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
    const response = await sendPostNoToken("/api/auth/signin", payload);
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
    const response = await sendGetOnce("/api/user", payload);
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
    const response = await sendPostOnce("/api/manage/customer/create", payload);
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
    const response = await sendPostOnce("/api/manage/employee/create", payload);
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
    const response = await sendPostOnce("/api/auth/signup", payload);
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
    const response = await sendGetOnce("/api/manage/customer", payload);
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
    const response = await sendGetOnce("/api/manage/employee", payload);
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
    const response = await sendPutOnce(`/api/manage/customer/edit-info/${customer_id}`, newPayload);
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
    const response = await sendGetOnce("/api/book", payload);

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
    const response = await sendGetOnce("/api/manage/voucher", payload);

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
    const response = await sendPutOnce(`/api/manage/book/${payload.bookId}`, payload);

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
    const response = await sendPostOnce(`/api/manage/book/create`, payload);

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
    const response = await sendGetOnce("/api/manage/salary-scale");

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
    const response = await sendPutOnce(`/api/manage/employee/${employee_id}`, newPayload);
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
    const response = await sendDeleteOnce(`/api/manage/salary-scale/${payload._id}`, payload);
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
    const response = await sendPostOnce(`/api/manage/salary-scale`, payload);
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
    const response = await sendGetOnce("/api/manage/customer/top-10");

    if (response) {
      return response
    } else {
      return null
    }
  },

  [MutationTypes.CREATE_A_VOUCHER] : async (
    { commit }: { commit: any },
    payload: any
  ) => {
    payload = turnOnDevMode(payload);
    const response = await sendPostOnce("/api/manage/voucher/create", payload);

    if (response) {
      return response
    } else {
      return null
    }
  },

  [MutationTypes.GET_ALL_CATEGORIES] : async (
    { commit }: { commit: any },
    payload: any
  ) => {
    payload = turnOnDevMode(payload);
    const response = await sendGetOnce("/api/manage/book/category", payload);

    if (response) {
      return response
    } else {
      return null
    }
  },

  [MutationTypes.DELETE_A_BOOK] : async (
    { commit }: { commit: any },
    payload: any
  ) => {
    payload = turnOnDevMode(payload);
    const response = await sendDeleteOnce(`/api/manage/book/${payload.bookId}`, payload);

    if (response) {
      return response
    } else {
      return null
    }
  },

  [MutationTypes.CREATE_LIST_BOOKS] : async (
    { commit }: { commit: any },
    payload: any
  ) => {
    payload = turnOnDevMode(payload);
    const response = await sendPostOnce(`/api/manage/book/import`, payload);

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
  //   const response = await sendGetOnce("/api/manage/customer/top-10", payload);

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
    const response = await sendGetOnce("/api/invoice", payload);

    if (response) {
      return response
    } else {
      return null
    }
  },
  [MutationTypes.GET_INVOICES_BY_ID] : async (
    { commit }: { commit: any },
    payload: any
  ) => {
    payload = turnOnDevMode(payload);
    const response = await sendGetOnce(`/api/invoice/customer/${payload.id}`,payload);

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
    const response = await sendGetOnce(`/api/invoice/${payload.id}`);

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
    const response = await sendGetOnce(`/api/manage/expense`,payload);

    if (response) {
      return response
    } else {
      return null
    }
  },

  [MutationTypes.UPLOAD_MULTIPLE_IMAGES] : async (
    { commit }: { commit: any },
    payload: any
  ) => {
    payload = turnOnDevMode(payload);
    const response = await sendPostOnce(`/image-server/upload/multiple`,payload);
    if (response) {
      return response
    } else {
      return null
    }
  },

  [MutationTypes.ADD_EXPENSE] : async (
    { commit }: { commit: any },
    payload: any
  ) => {
    payload = turnOnDevMode(payload);
    const response = await sendPostOnce(`/api/manage/expense/create`,payload);

    if (response) {
      return response
    } else {
      return null
    }
  },

  [MutationTypes.UPDATE_STATUS_EXPENSE] : async (
    { commit }: { commit: any },
    payload: any
  ) => {
    payload = turnOnDevMode(payload);
    const expenses_id = payload.expenses_id
    let newPayload = { ...payload };
    delete newPayload.expenses_id;
    const response = await sendPutOnce(`/api/manage/expense/update-status/${expenses_id}`, newPayload);
    if (response) {
      return response
    } else {
      return null
    }
  },
  
};

export default actions;
