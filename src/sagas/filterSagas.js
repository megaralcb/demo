import { put, takeEvery } from "redux-saga/effects";

//Actions
import * as ACTIONS from "./../actions/actionConstants";

function* changeFilter(action) {
  yield put({ type: ACTIONS.NEW_FILTER, payload: action.meta.filter });
}

export function* filterSaga() {
  yield takeEvery(ACTIONS.CHANGE_FILTER, changeFilter);
}
