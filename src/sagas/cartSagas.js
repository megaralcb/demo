import { put, takeEvery, takeLatest } from "redux-saga/effects";

//Actions
import * as ACTIONS from "./../actions/actionConstants";

//Deps
import { push } from "react-router-redux";

//Workers
function* cartHandler(action) {
  if (action.meta.tag === "ADD") {
    const product = action.meta.products.filter(a => (a.id === action.meta.id ? a : null));
    let newCart = [...action.meta.cart, ...product];
    yield put({ type: ACTIONS.ADD_TO_CART, payload: product, cart: newCart });
  } else if (action.meta.tag === "REMOVE") {
    let newCart = action.meta.cart.filter(a => a.id !== action.meta.id);
    yield put({ type: ACTIONS.REMOVE_FROM_CART, payload: newCart, cart: newCart });
  }
}

function* changeQuantityHandler(action) {
  const { e } = action.payload;
  const { item, items } = action.payload.meta;

  //Change item
  let newItems = [];
  for (let i = 0; i < items.length; i++) {
    items[i].id === item.id ? newItems.push({ ...items[i], quantity: e }) : newItems.push(items[i]);
  }
  yield put({ type: ACTIONS.UPDATE_QUANTITY, payload: newItems, cart: newItems });

  //Show/hide modal
  if (e === 0) {
    yield put({
      type: ACTIONS.SHOW_MODAL,
      payload: true
    });
  } else {
    yield put({
      type: ACTIONS.SHOW_MODAL,
      payload: false
    });
  }
}

function* checkDeleteHandler(action) {
  // eslint-disable-next-line
  const { e } = action.payload;
  // eslint-disable-next-line
  const { item, items } = action.payload.meta;

  yield put({ type: ACTIONS.CONFIRM_DELETE, payload: items, cart: items });
}

function* checkoutHandler(action) {
  yield put({ type: ACTIONS.HANDLE_CART_CLICK, payload: false });
  yield put(push("/checkout"));
}

function* updateSubtotalHandler(action) {
  //action.cart is state.cart.item
  if (action.cart.length) {
    let subTotal = 0;
    for (let i = 0; i < action.cart.length; i++) {
      let item = action.cart[i];
      item.discountedPrice
        ? (subTotal += Number(item.discountedPrice * item.quantity))
        : (subTotal += Number(item.price * item.quantity));
    }
    yield put({ type: ACTIONS.UPDATE_SUBTOTAL, payload: subTotal });
  } else {
    yield put({ type: ACTIONS.UPDATE_SUBTOTAL_FAILED, payload: action });
  }
}

//Watchers
export function* cartSaga() {
  yield takeEvery(ACTIONS.CART, cartHandler);
}

export function* changeQuantitySaga() {
  yield takeEvery(ACTIONS.CHANGE_QUANTITY, changeQuantityHandler);
}

export function* checkDeleteSaga() {
  yield takeEvery(ACTIONS.CHECK_DELETE, checkDeleteHandler);
}

export function* checkoutSaga() {
  yield takeLatest(ACTIONS.CHECKOUT, checkoutHandler);
}

export function* updateSubtotalSaga() {
  yield takeEvery(action => /@@cart/.test(action.type), updateSubtotalHandler);
}
