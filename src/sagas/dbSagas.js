import {call, put, takeEvery} from "redux-saga/effects";

//Actions
import * as ACTIONS from "./../actions/actionConstants"

//Deps
import {db} from "./../firebase"

function * accessDB(action) {
    //Get user from batch
    const setSubmitted = action.actions[0];
    const setValidity = action.actions[1];
    if (setSubmitted.type === "rrf/setSubmitted" && setSubmitted.submitted) {
        let user = setValidity.validity;
        const {uid} = user;
        /*

            SIGN IN

        */
        if (setSubmitted.model === "forms.signIn") {
            const userData = yield db.onceGetUser(uid);
            console.log(userData.val())
        }
    }
}

function * handleUserData(action) {
    /*

            SIGN UP

        */
    const {data, dispatches, type} = action.payload.meta;

    //Submit user
    if (type === "user_name") {
        const user = yield call(dispatches);
        yield db.doCreateUser(user.uid, data.name, data.firstname, user.email)

        //Update user data
        const userData = yield db.onceGetUser(user.uid)
        yield put({
            type: ACTIONS.UPDATE_USER,
            payload: userData.val()
        })
    }
}

export function * dbSaga() {
    yield takeEvery("rrf/batch", accessDB)
}

export function * userDataSaga() {
    yield takeEvery(ACTIONS.SUBMIT_USER_DATA, handleUserData)
}