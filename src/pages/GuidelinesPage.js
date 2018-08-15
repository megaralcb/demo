import React, { Component } from "react";
import { connect } from "react-redux";

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

class GuidelinesPage extends Component {
  render() {
    return null;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GuidelinesPage);
