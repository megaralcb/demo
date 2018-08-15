// eslint-disable-next-line
import React, { Component } from "react";
import { connect } from "react-redux";

//Deps
// eslint-disable-next-line
import classNames from "classnames";

function mapStateToProps(state) {
  return {
    state
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

class LandingPage extends Component {
  render() {
    return <div />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
