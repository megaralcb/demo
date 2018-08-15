import React, { Component } from "react";
import { connect } from "react-redux";

//Actions
import * as ACTIONS from "./../actions/actionConstants";

//Components
import CartItem from "./../components/Cart/CartItem";

//Deps
import classNames from "classnames";

//MUID
import Button from "material-ui/Button";

function mapStateToProps(state) {
  return {
    cart: state.cart.items,
    cartSubTotal: state.cart.subTotal,
    deviceType: state.app.deviceType,
    isActive: state.cart.isActive
  };
}

function mapDispatchToProps(dispatch) {
  return {
    checkout: () => dispatch({ type: ACTIONS.CHECKOUT }),
    handleCartClick: value => dispatch({ type: ACTIONS.HANDLE_CART_CLICK, payload: value }),
    removeItem: (item, cart) => dispatch({ type: ACTIONS.REMOVE_ITEM, meta: { item, cart } })
  };
}

class Cart extends Component {
  render() {
    const { cart, checkout, deviceType, handleCartClick, isActive, removeItem } = this.props;

    //Classes
    const openCartContainer = classNames({
      openCartContainer: true
    });
    const closeCart = classNames({
      closeCart: true,
      isMobile: deviceType === "mobile",
      isActive: isActive
    });
    const cartContainer = classNames({
      isActive: isActive,
      isMobile: deviceType === "mobile",
      cartContainer: true
    });
    const cartItemsContainer = classNames({
      cartItemsContainer: true,
      isMobile: deviceType === "mobile"
    });
    const cartItemsWrapper = classNames({
      cartItemsWrapper: true,
      isMobile: deviceType === "mobile"
    });
    const headerBlocker = classNames({
      headerBlocker: true
    });
    const cartTitle = classNames({
      cartTitle: true,
      isActive: isActive
    });
    const checkoutButtonWrapper = classNames({
      checkoutButtonWrapper: true,
      isActive: isActive
    });

    //Mapped CartItems
    const mappedCartItems = cart.map((a, i) => {
      const mapProps = {
        cart,
        category: a.category,
        description: a.description,
        discountedPrice: a.discountedPrice,
        images: a.images,
        isActive: isActive,
        price: a.price,
        item: a
      };
      return <CartItem {...mapProps} key={`${a.id}_cartItem`} removeItem={removeItem} />;
    });

    //Output
    return (
      <div className={openCartContainer}>
        <div className={closeCart} onClick={() => handleCartClick(false)} />
        <div className={cartContainer}>
          <div className={headerBlocker} />
          <div className={cartItemsContainer}>
            <div className={cartTitle}> cart </div>
            <div className={cartItemsWrapper}>{mappedCartItems}</div>
            <div className={checkoutButtonWrapper}>
              <Button
                variant="raised"
                color="secondary"
                style={{ width: "100%" }}
                onClick={() => checkout()}>
                <i className="material-icons checkoutIcon">verified_user</i>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
