import React, {Component} from "react";
import {connect} from "react-redux";

//Actions
import * as ACTIONS from "./../actions/actionConstants";

//Auth Pages
import AccountPage from "./../pages/auth/AccountPage";
import LandingPage from "./../pages/auth/LandingPage";
import ResetPage from "./../pages/auth/ResetPage";
import SignInPage from "./../pages/auth/SignInPage";
import SignUpPage from "./../pages/auth/SignUpPage";

//Root Pages
import CheckoutPage from "./../pages/CheckoutPage";
import GalleryPage from "./../pages/GalleryPage";
import HomePage from "./../pages/HomePage";
import StorePage from "./../pages/StorePage";

//Components
import Cart from "./Cart";
import Footer from "./../components/App/Footer";
import Header from "./../components/App/Header";

//Deps
import classNames from "classnames";

//Helpers
import {checkDeviceOnResize} from "./../helpers/events";

//Router
import {ConnectedRouter} from "react-router-redux";
import {history} from "./../index";
import {Route} from "react-router";

//Styles
import "./../styles/index.css";

function mapStateToProps(state) {
  return {
    deviceType: state.app.deviceType,
    items: state.cart.items,
    isActive: state.cart.isActive,
    isHovered: state.cart.isHovered,
    isMobile: state.app.deviceType === "mobile",
    mobileHeaderActive: state.app.mobileHeaderActive,
    path: state.router
      ? state.router.location
      : null,
    user: state.user.userAuth
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    activateMobileHeader: value => dispatch({type: ACTIONS.ACTIVATE_MOBILE_HEADER, isActive: value}),
    deviceTypeDispatch: device => dispatch({type: ACTIONS.CHECK_DEVICE, payload: device}),
    getRecentImages: () => dispatch({type: ACTIONS.GET_RECENT_IMAGES_PENDING}),
    handleCartClick: value => dispatch({type: ACTIONS.HANDLE_CART_CLICK, payload: value}),
    init: () => dispatch({type: ACTIONS.INIT, dispatch})
  };
}

class App extends Component {
  componentWillMount() {
    const {deviceType, deviceTypeDispatch, getRecentImages, init} = this.props;
    // eslint-disable-next-line
    deviceType === null
      ? init()
      : null;
    getRecentImages();

    //Events
    checkDeviceOnResize(deviceTypeDispatch);
  }

  render() {
    const {activateMobileHeader, isMobile} = this.props;
    //Classes
    const routeContainer = classNames({routeContainer: true});
    const routeWrapper = classNames({routeWrapper: true, isMobile});

    return (
      <div className="App">
        <Header {...this.props} activateMobileHeader={activateMobileHeader}/>
        <Cart/>
        <ConnectedRouter history={history}>
          <div className={routeContainer}>
            <div className={routeWrapper}>
              <Route exact path="/" component={ResetPage}/>
              <Route exact path="/checkout" component={CheckoutPage}/>
              <Route exact path="/gallery" component={GalleryPage}/>
              <Route exact path="/home" component={HomePage}/>
              <Route exact path="/store" component={StorePage}/>
              <Route exact path="/account" component={AccountPage}/>
              <Route exact path="/landing" component={LandingPage}/>
              <Route exact path="/reset" component={ResetPage}/>
              <Route exact path="/signin" component={SignInPage}/>
              <Route exact path="/signup" component={SignUpPage}/>
            </div>
          </div>
        </ConnectedRouter>
        <Footer/>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
