//Redux
import { combineReducers } from "redux";

//Reducers
import appReducer from "./appReducer";
import cartReducer from "./cartReducer";
import formsReducer from "./formReducer";
import IGReducer from "./IGReducer";
import productsReducer from "./productsReducer";
import { routerReducer } from "react-router-redux";
import userReducer from "./userReducer";

export default combineReducers({
  app: appReducer,
  cart: cartReducer,
  forms: formsReducer,
  IG: IGReducer,
  products: productsReducer,
  router: routerReducer,
  user: userReducer
});
