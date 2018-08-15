import {combineForms} from "react-redux-form";

//Initial states
const billingModel = {
  firstName: "",
  lastName: "",
  street: "",
  city: "",
  state: "",
  country: "",
  error: null
};
const resetModel = {
  email: ""
}
const shippingModel = {
  firstName: "",
  lastName: "",
  street: "",
  city: "",
  state: "",
  country: "",
  error: null
};
const signInModel = {
  email: "",
  password: "",
  error: null
};
const signUpModel = {
  email: "",
  name: "",
  password: "",
  passwordConfirm: "",
  error: null
};

const formsReducer = combineForms({
  billing: billingModel,
  reset: resetModel,
  shipping: shippingModel,
  signIn: signInModel,
  signUp: signUpModel
}, "forms");

export default formsReducer;
