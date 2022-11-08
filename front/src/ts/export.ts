import { toast } from "react-toastify";

export const defaultImage = require(`../img/cat-face.png`)

export const type_1 = require('../img/type_1.svg')
export const type_2 = require('../img/type_2.svg')
export const type_3 = require('../img/type_3.svg')
export const type_4 = require('../img/type_4.svg')
export const type_5 = require('../img/type_5.svg')
export const type_6 = require('../img/type_6.svg')

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

export const imgRequire = (path: string) => {
  console.log(path);

  return require(`../uploads/` + path)
}