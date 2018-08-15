import { put, takeEvery } from "redux-saga/effects";

//Actions
import * as ACTIONS from "./../actions/actionConstants";

//Opens mobile menu in header, closes cart
function* activateMobileHeader(action) {
  yield put({ type: ACTIONS.HANDLE_CART_CLICK, payload: false });
  yield put({ type: ACTIONS.MOBILE_HEADER_ACTIVE, payload: !action.isActive });
}

//Closes mobile menu in header onClick cart
function* handleCartClick(action) {
  yield put({ type: ACTIONS.MOBILE_HEADER_ACTIVE, payload: false });
}

//Watchers
export function* mobileButtonSaga() {
  yield takeEvery(ACTIONS.ACTIVATE_MOBILE_HEADER, activateMobileHeader);
}

export function* mobileCartSaga() {
  yield takeEvery(ACTIONS.HANDLE_CART_CLICK, handleCartClick);
}
