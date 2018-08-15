import {all} from "redux-saga/effects";
import {cartSaga, changeQuantitySaga, checkDeleteSaga, checkoutSaga, updateSubtotalSaga} from "./cartSagas";
import {dbSaga, userDataSaga} from "./dbSagas";
import {filterSaga} from "./filterSagas";
import {mobileButtonSaga, mobileCartSaga} from "./menuSagas";
import {imageSaga} from "./imageSagas";
import {initSaga} from "./initSagas";
import {routeSaga, rerouteSaga} from "./routeSagas";
import {batchActions, clearErrors, signOut} from "./formSagas";

export default function * rootSaga() {
  yield all([
    initSaga(),
    dbSaga(),
    userDataSaga(),
    mobileButtonSaga(),
    mobileCartSaga(),
    filterSaga(),
    changeQuantitySaga(),
    cartSaga(),
    imageSaga(),
    checkoutSaga(),
    routeSaga(),
    rerouteSaga(),
    checkDeleteSaga(),
    clearErrors(),
    batchActions(),
    signOut(),
    updateSubtotalSaga()
  ]);
}
