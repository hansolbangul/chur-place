import { toast } from "react-toastify";

export const defaultImage = require(`../img/cat-face.png`)

export const warning_notify = (message: string) => {
  toast.warning(message, {
    autoClose: 1000,
    hideProgressBar: true,
  });
};

export const success_notify = (message: string) => {
  toast.success(message, {
    autoClose: 1000,
    hideProgressBar: true,
  });
};