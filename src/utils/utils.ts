import store from "@/store";
import { MutationTypes } from "@/store/mutation-types";

function isValidEmail(email: string) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailPattern.test(email);
}

function fixedCurrency(number: number) {
  return number.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}

export {
  isValidEmail,
  fixedCurrency
}