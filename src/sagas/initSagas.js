import {put, takeEvery} from "redux-saga/effects";

//Actions
import * as ACTIONS from "./../actions/actionConstants";

//Auth
import {auth} from "./../firebase/firebase";

function * initApp(action) {
  //Set device width watcher
  if (window.innerWidth <= 450) {
    yield put({type: ACTIONS.CHECK_DEVICE, payload: "mobile"});
  } else if (window.innerWidth > 450 && window.innerWidth <= 1024) {
    yield put({type: ACTIONS.CHECK_DEVICE, payload: "tablet"});
  } else {
    yield put({type: ACTIONS.CHECK_DEVICE, payload: "desktop"});
  }

  //Set user watcher/dispatcher
  yield auth.onAuthStateChanged(user => {
    action.dispatch({type: ACTIONS.SET_USER_DATA, payload: user});
  });
}

export function * initSaga() {
  yield takeEvery(ACTIONS.INIT, initApp);
}
