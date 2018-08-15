import React from "react";

//Deps
import classNames from "classnames";
import {push} from "react-router-redux";

//Sign Out
import * as ACTIONS from "./../../actions/actionConstants";

const NavLinks = props => {
  const {
    dispatch,
    handleCartClick,
    isActive,
    isMobile,
    items,
    mobileHeaderActive,
    user
  } = props;

  //Classes
  const headerWrapper = classNames({headerWrapper: true, isMobile: isMobile});

  const brandGroup = classNames({brandGroup: true, isActive: mobileHeaderActive, isMobile: isMobile});
  const mobileHeaderItem = classNames({mobileHeaderItem: true, isActive: mobileHeaderActive, isMobile: isMobile});

  //Cart Classes
  const headerCart = classNames({headerCart: true});
  const cartWrapper = classNames({cartWrapper: true});
  const cartClass = classNames({
    [`material-icons`]: true,
    emptyCart: items.length === 0,
    fullCart: items.length !== 0,
    isActive: isActive
  });

  return (
    <div>
      <div className={brandGroup}>
        <div className={mobileHeaderItem} onClick={() => dispatch(push("home"))}>
          home
        </div>
        <div className={mobileHeaderItem} onClick={() => dispatch(push("store"))}>
          store
        </div>
        <div className={mobileHeaderItem} onClick={() => dispatch(push("gallery"))}>
          gallery
        </div>

        {user
          ? (
            <div
              className={mobileHeaderItem}
              onClick={() => dispatch({type: ACTIONS.SUBMIT_SIGN_OUT})}>
              log out
            </div>
          )
          : (
            <div className={headerWrapper}>
              <div className={mobileHeaderItem} onClick={() => dispatch(push("signin"))}>
                sign in
              </div>
              <div className={mobileHeaderItem} onClick={() => dispatch(push("signup"))}>
                sign up
              </div>
            </div>
          )}
      </div>

      {isMobile
        ? (
          <div className={headerCart}>
            <div className={cartWrapper} onClick={() => handleCartClick(!isActive)}>
              <div className="itemCount">
                <i className={cartClass}>shopping_cart</i>
              </div>
            </div>
          </div>
        )
        : null}
    </div>
  );
};

export default NavLinks;
