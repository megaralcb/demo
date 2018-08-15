import React, {Component} from "react";
import {connect} from "react-redux";

// eslint-disable-next-line
import classNames from "classnames";

function mapStateToProps(state) {
  return {userName: state.user.currentUser.firstname};
}

function mapDispatchToProps(dispatch) {
  return {dispatch};
}

class HomePage extends Component {
  render() {
    const {userName} = this.props
    return <div>
      <h3 style={{
        padding: "2em"
      }}>
        {userName
          ? `Welcome, ${userName}`
          : "Welcome"}
      </h3>
    </div>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
