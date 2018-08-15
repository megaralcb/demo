import React from "react";
import classNames from "classnames";

//Components
import NavLinks from "./NavLinks";

/*

      NB: This is an IMPURE component.

      Reason:
      dispatch is passed as a prop

      Use:
      to call dispatch(push("/")) commands to router
      - push cannot be passed in mapDispatchToProps

*/

const Header = props => {
  const { activateMobileHeader, isMobile, mobileHeaderActive, path } = props;

  //Link Classes
  const headerBlocker = classNames({ headerBlocker: true });
  const headerContainer = classNames({
    filterBarIsActive: path ? path.pathname === "/" : null,
    hasScrolled: true,
    headerContainer: true,
    isMobile: isMobile
  });
  const mobileHeaderButton = classNames({ mobileHeaderButton: true, isMobile });
  const mobileRoute = classNames({ mobileRoute: true });
  const mobileScreen = classNames({ mobileScreen: true, isActive: mobileHeaderActive });

  return (
    <div>
      <div className={mobileScreen} onClick={value => activateMobileHeader(true)} />
      <div className={headerBlocker} />
      <div className={headerContainer} id="headerContainer">
        <div
          className={mobileHeaderButton}
          onClick={value => activateMobileHeader(mobileHeaderActive)}
        >
          {mobileHeaderActive ? (
            <i className="material-icons">clear</i>
          ) : (
            <i className="material-icons">menu</i>
          )}
        </div>
        <div className={mobileRoute}>{path && isMobile ? path.pathname.substr(1) : null}</div>

        <NavLinks {...props} />
      </div>
    </div>
  );
};

export default Header;
