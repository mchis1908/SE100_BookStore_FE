import store from "@/store";
import { MutationTypes } from "@/store/mutation-types";

function isValidEmail(email: string) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailPattern.test(email);
}

export {
  isValidEmail,
}