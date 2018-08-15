import {call, put, select, takeLatest} from "redux-saga/effects";

//Actions
import * as ACTIONS from "./../actions/actionConstants";

//Auth
import {auth} from "./../firebase";

//Form Actions
import {actions} from "react-redux-form";

//Redirect
import {push} from "react-router-redux";

//Util
import {validate} from "./util/validate";

/*

  Batch Actions

*/
function * handleRRFBatchActions(action) {
  //Delay to keep the server from choking
  const delay = ms => new Promise(res => setTimeout(res, ms));

  //Validate before asking Firebase about emails
  let resetValidated = validate(action, "forms.reset.email");
  let signUpValidated = validate(action, "forms.signUp.email");
  let signInValidated = validate(action, "forms.signIn.email");

  //Loop through RRF Batch
  for (let i = 0; i < action.actions.length; i++) {
    //Action
    let a = action.actions[1];

    /*
        SIGN UP
    */
    //Real-time email checking
    if (action.model === "forms.signUp.email" && a.type === "rrf/change") {
      if (signUpValidated) {
        yield delay(1000);
        const checkPass = yield call(auth.doFetchProvidersForEmail, a.value);
        const emailNotTaken = checkPass.length > 0
          ? false
          : true;
        yield put(actions.setValidity("forms.signUp.email", {emailNotTaken: emailNotTaken}));
      }
    }

    /*
        SIGN IN
    */
    //Real-time email checking
    if (action.model === "forms.signIn.email" && a.type === "rrf/change") {
      if (signInValidated) {
        yield delay(1000);
        const checkPass = yield call(auth.doFetchProvidersForEmail, a.value);
        const noUserAtEmail = checkPass.length > 0
          ? true
          : false;
        yield put(actions.setValidity("forms.signIn.email", {noUserAtEmail: noUserAtEmail}));
      }
    }

    if (action.model === "forms.signIn.password" && a.type === "rrf/change") {
      yield put(actions.setInitial("forms.signIn"))
    }

    /*
        RESET PASSWORD
    */
    //Real-time email checking
    if (action.model === "forms.reset.email" && a.type === "rrf/change") {
      if (resetValidated) {
        yield delay(500);
        const checkPass = yield call(auth.doFetchProvidersForEmail, a.value);
        const noUserAtEmail = checkPass.length > 0
          ? true
          : false;
        yield put(actions.setValidity("forms.reset.email", {noUserAtEmail: noUserAtEmail}));
      }
      yield put(actions.blur("forms.reset.email"));
    }

    //Clear error on password change
    if ((action.model === "forms.signIn.password" && a.type === "rrf/change")) {
      const store = yield select();
      if (store.user.errors) {
        yield put({type: ACTIONS.SET_USER_ERROR_DATA, payload: ""});
      }
    }

    /*
        RESET FORMS ON SUBMIT
    */
    if ((action.model === "forms.reset" && action.actions[0].type === "rrf/setSubmitted")) {
      const store = yield select();

      if (action.actions[0].submitted) {
        yield put(actions.change("forms.signIn.password", store.forms.reset.email))
        yield put(actions.reset("forms.reset"))
      }
    }

    /*
        SUBMIT, VALIDATE, AND REDIRECT
    */
    //Submit validation
    switch (a.type) {
      case "rrf/setErrors":
        {
          if (typeof a.errors === "string") {
            yield put({type: ACTIONS.SET_USER_ERROR_DATA, payload: a.errors});
          }
          break;
        }
      case "rrf/setValidity":
        {
          if (a.validity) {
            yield delay(700);
            yield put(push("home"));
          }
          break;
        }
      default:
        {
          // eslint-disable-next-line
          yield null;
        }
    }

  }
}

/*

  Sign out
    NB: Currently handled in Saga -> Watcher/Dispatch in initSagas

*/
function * handleSignOut(action) {
  try {
    yield call(auth.doSignOut);
    yield put(actions.reset("forms.signIn"))
    yield put(actions.reset("forms.signUp"))
    yield put(push("home"));

  } catch (err) {
    console.log(err);
  }
}

function * clearErrorsWorker(action) {
  yield put({type: ACTIONS.SET_USER_ERROR_DATA, payload: ""});
}

/*

  WATCHERS

*/
export function * batchActions() {
  yield takeLatest("rrf/batch", handleRRFBatchActions);
}

export function * signOut() {
  yield takeLatest(ACTIONS.SUBMIT_SIGN_OUT, handleSignOut);
}

export function * clearErrors() {
  yield takeLatest("@@router/LOCATION_CHANGE", clearErrorsWorker)
}