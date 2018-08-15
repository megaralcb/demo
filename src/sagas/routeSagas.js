import {takeEvery, put} from "redux-saga/effects";

//Actions
import * as ACTIONS from "./../actions/actionConstants";

//RRF Actions
import {actions} from "react-redux-form"

function * handleRoutes(action) {
  yield put({type: ACTIONS.HANDLE_CART_CLICK, payload: false});
  yield put({type: ACTIONS.MOBILE_HEADER_ACTIVE, payload: false});
}

function * rerouteHandler(action) {
  const {email, route, model} = action.payload;
  yield put(actions.load(model, email));
  yield put(route);
}

export function * routeSaga() {
  yield takeEvery("@@router/LOCATION_CHANGE", handleRoutes);
}

export function * rerouteSaga() {
  yield takeEvery(ACTIONS.ROUTE_AND_AUTOFILL, rerouteHandler)
}