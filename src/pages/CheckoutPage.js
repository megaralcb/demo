import React, { Component } from "react";
import { connect } from "react-redux";

//Actions
import * as ACTIONS from "./../actions/actionConstants";

//Components
import CheckoutSummary from "./Checkout/CheckoutSummary";

//Deps
import classNames from "classnames";
import { push } from "react-router-redux";

function mapStateToProps(state) {
  return {
    cartSubTotal: state.cart.subTotal,
    deviceType: state.app.deviceType,
    isMobile: state.app.deviceType === "mobile",
    items: state.cart.items,
    showModal: state.cart.showModal
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeQuantity: (e, meta) => dispatch({ type: ACTIONS.CHANGE_QUANTITY, payload: { e, meta } }),
    checkDelete: (e, meta) => dispatch({ type: ACTIONS.CHECK_DELETE, payload: { e, meta } }),
    goToStore: () => dispatch(push("store")),
    removeFromCart: (id, cart) =>
      dispatch({ type: ACTIONS.CART, meta: { cart, id, tag: "REMOVE" } })
  };
}

class CheckoutPage extends Component {
  render() {
    const { goToStore, items } = this.props;

    //Classes
    const checkoutContainer = classNames({
      checkoutContainer: true
    });
    const headerTitle = classNames({
      headerTitle: true
    });
    const checkoutNoItems = classNames({
      checkoutNoItems: true
    });

    return (
      <div className={checkoutContainer}>
        <h3 className={headerTitle}> order summary </h3>
        {items.length ? (
          <CheckoutSummary {...this.props} />
        ) : (
          <div>
            <div className={checkoutNoItems}>
              No items in your cart. Head over to the
              <div className="checkoutStoreLink" onClick={() => goToStore()}>
                store.
              </div>
            </div>
          </div>
        )}{" "}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPage);
