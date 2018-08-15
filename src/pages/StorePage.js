import React, { Component } from "react";
import { connect } from "react-redux";

//Actions
import * as ACTIONS from "./../actions/actionConstants";

//Components
import FilterBar from "./Store/FilterBar";
import Image from "./../components/Image";
import Prices from "./Store/Prices";

//MUI
import Button from "material-ui/Button";

//Deps
import classNames from "classnames";

function mapStateToProps(state) {
  return {
    activeFilter: state.app.activeFilter,
    cart: state.cart.items,
    deviceType: state.app.deviceType,
    filterBarIsExpanded: state.app.filterBarIsExpanded,
    isDesktop: state.app.deviceType === "desktop",
    path: state.router.location.pathname,
    products: state.products.products
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addToCart: (id, products, cart) =>
      dispatch({ type: ACTIONS.CART, meta: { id, products, cart, tag: "ADD" } }),
    changeFilter: filter => dispatch({ type: ACTIONS.CHANGE_FILTER, meta: { filter } }),
    removeFromCart: (id, cart) =>
      dispatch({ type: ACTIONS.CART, meta: { cart, id, tag: "REMOVE" } }),
    toggleFilterBar: value => {
      dispatch({ type: ACTIONS.TOGGLE_FILTER_BAR, payload: !value });
    }
  };
}

function checkIfItemInCart(a, cart) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id === a.id) {
      return true;
    }
  }
  return false;
}

class StorePage extends Component {
  render() {
    const {
      activeFilter,
      addToCart,
      cart,
      changeFilter,
      isDesktop,
      products,
      removeFromCart,
      toggleFilterBar
    } = this.props;

    //Classes
    const imagesContainer = classNames({
      imagesContainer: true,
      isDesktop
    });

    //Images and buttons
    const images = products.map((a, i) => {
      // TODO: Only show products with price
      if (a.price === null) return null;

      //Display if filter on
      const itemWrapper = classNames({
        itemWrapper: true,
        isActive: a.category === activeFilter || activeFilter === "all"
      });

      return (
        <div className={itemWrapper} key={`${a.id}_images`}>
          <Image description={a.description} title={a.title} images={a.images} />
          {checkIfItemInCart(a, cart) ? (
            <Button
              variant="raised"
              color="secondary"
              tag="REMOVE"
              onClick={() => removeFromCart(a.id, cart)}>
              <i className="material-icons cartIcon">check_circle</i>
            </Button>
          ) : (
            <Button
              variant="raised"
              tag="ADD"
              color="primary"
              onClick={() => addToCart(a.id, products, cart)}>
              <i className="material-icons cartIcon">add_shopping_cart</i>
            </Button>
          )}
          <Prices {...this.props} item={a} isCentered={true} />
        </div>
      );
    });

    return (
      <div>
        <FilterBar {...this.props} changeFilter={changeFilter} toggleFilterBar={toggleFilterBar} />
        <div className={imagesContainer}>{images}</div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StorePage);
