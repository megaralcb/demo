// eslint-disable-next-line
import React, {Component} from "react";
import {connect} from "react-redux";

//Actions
import * as ACTIONS from "./../../actions/actionConstants"

//Components
import Button from "material-ui/Button";
import RRFInput from "./../../components/Inputs/RRFInput";

//Deps
import {actions, Form} from "react-redux-form";
import classNames from "classnames";
import {error, validate} from "./util";
import {push} from "react-router-redux"

//Firebase
import {auth} from "./../../firebase";

function mapStateToProps(state) {
  return {
    //User
    user: state.user.userAuth,

    //Form Values
    email: state.forms.reset.email,

    //Form State
    pending: state.forms.forms.reset.$form.pending,
    submitted: state.forms.forms.reset.$form.submitted,
    submitFailed: state.forms.forms.reset.$form.submitFailed,
    validating: state.forms.forms.reset.$form.validating,

    //Validation
    emailIsValid: state.forms.forms.reset.email.valid,
    formIsValid: state.forms.forms.reset.$form.valid,

    //Reducer Props
    errors: state.user.errors,
    isMobile: state.app.deviceType === "mobile",

    //Errors
    emailErrors: state.forms.forms.reset.email.errors,
    formErrors: state.forms.forms.reset.$form.errors
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    handleSubmit: e => dispatch({type: ACTIONS.HANDLE_SUBMIT, payload: e}),
    reRouteAndAutofill: (email, route, model) => dispatch({
      type: ACTIONS.ROUTE_AND_AUTOFILL,
      payload: {
        route: push(route),
        email: email,
        model: model
      }
    }),
    redirectHome: () => dispatch(push("home")),

    resetPassword: () => dispatch(push("reset"))
  };
}

class ResetPage extends Component {
  //Methods
  submitReset(val) {
    const {dispatch} = this.props;
    dispatch(actions.submit("forms.reset", auth.doPasswordReset(val.email)));
    dispatch(push("signin"))
  }

  componentWillMount() {
    const {redirectHome, user} = this.props;
    return user !== null
      ? redirectHome()
      : null
  }

  render() {
    const {
      email,
      emailErrors,
      emailIsValid,
      errors,
      formIsValid,
      isMobile,
      pending,
      reRouteAndAutofill,
      resetPassword,
      submitFailed,
      submitted,
      validating
    } = this.props;

    //Classes
    const pageWrapper = classNames({pageWrapper: true});
    const headerTitle = classNames({headerTitle: true});
    const formWrapper = classNames({formWrapper: true, isMobile});
    const loading = classNames({"material-icons": true, spin: true});
    const forgotPassword = classNames({forgotPassword: true, isMobile: isMobile})

    //Input configs
    const emailConfig = {
      label: "email",
      type: "email",
      autoFocus: true,
      fullWidth: true
    };

    return (
      <div className={pageWrapper}>
        <h3 className={headerTitle}>reset password</h3>

        <Form
          model="forms.reset"
          onSubmit={val => this.submitReset(val)}
          className={formWrapper}>
          <RRFInput
            {...emailConfig}
            autoComplete="yes"
            errorMessages={error.emailErrors}
            errors={emailErrors}
            isValid={emailIsValid}
            model="forms.reset.email"
            reRouteAndAutofill={reRouteAndAutofill}
            validators={validate.emailRules(email)}
            value={email}/> {errors
            ? (
              <div className="validationErrorWrapper">
                <span>{errors}</span>
              </div>
            )
            : null}
          {submitFailed
            ? <div className={forgotPassword} onClick={resetPassword}>forgot password?</div>
            : null
}
          <Button
            color="primary"
            style={submitted || (formIsValid && !submitFailed)
            ? {
              padding: "1em",
              backgroundColor: "#a5d6a7",
              color: "black"
            }
            : submitFailed
              ? {
                padding: "1em",
                backgroundColor: "rgba(0, 0, 0, 0.12)",
                color: "black"
              }
              : {
                padding: "1em"
              }}
            type="submit"
            variant="raised"
            disabled={!formIsValid || pending || submitted || validating}>
            {pending
              ? (
                <i className={loading}>autorenew</i>
              )
              : submitted
                ? (
                  <i className="material-icons">check_circle</i>
                )
                : submitFailed
                  ? (
                    <i className="material-icons">clear</i>
                  )
                  : formIsValid
                    ? (
                      <i className="material-icons">check</i>
                    )
                    : (
                      <i className="material-icons">clear</i>
                    )}
          </Button>
        </Form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPage);
