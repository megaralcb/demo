import * as ACTIONS from "./../actions/actionConstants";
import * as API from "./../api/getRecentImages";

//Helpers
import { getConfig } from "./../helpers/imageConfig";

//Sagas
import { call, put, takeEvery } from "redux-saga/effects";

//Workers
function* getRecentImages(action) {
  try {
    const images = yield call(API.getRecentImages);
    yield put({ type: ACTIONS.GET_RECENT_IMAGES_FULFILLED, payload: images });

    //Sort images
    const { data } = images;

    yield put({ type: ACTIONS.SORT_IMAGES_PENDING });
    for (let i = 0; i < data.length; i++) {
      const cfg = getConfig(data[i]);

      //Add product
      yield put({
        type: ACTIONS.CREATE_PRODUCT_FROM_IMAGE,
        payload: cfg
      });
    }
  } catch (e) {
    yield put({ type: ACTIONS.GET_RECENT_IMAGES_REJECTED, payload: e.message });
  }

  yield put({ type: ACTIONS.SORT_IMAGES_FULFILLED });
}

//Watchers
export function* imageSaga() {
  yield takeEvery(ACTIONS.GET_RECENT_IMAGES_PENDING, getRecentImages);
}
