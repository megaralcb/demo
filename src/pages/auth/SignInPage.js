// eslint-disable-next-line
import React, {Component} from "react";
import {connect} from "react-redux";

//Actions
import * as ACTIONS from "./../../actions/actionConstants";

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
    email: state.forms.signIn.email,
    password: state.forms.signIn.password,

    //Form State
    pending: state.forms.forms.signIn.$form.pending,
    submitted: state.forms.forms.signIn.$form.submitted,
    submitFailed: state.forms.forms.signIn.$form.submitFailed,
    validating: state.forms.forms.signIn.$form.validating,

    //Validation
    emailIsValid: state.forms.forms.signIn.email.valid,
    formIsValid: state.forms.forms.signIn.$form.valid,
    passwordIsValid: state.forms.forms.signIn.password.valid,

    //Reducer Props
    errors: state.user.errors,
    isMobile: state.app.deviceType === "mobile",

    //Errors
    emailErrors: state.forms.forms.signIn.email.errors,
    formErrors: state.forms.forms.signIn.$form.errors,
    passwordErrors: state.forms.forms.signIn.password.errors
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

class SignInPage extends Component {
  //Methods
  submitSignIn(val) {
    const {dispatch} = this.props;
    dispatch(actions.submit("forms.signIn", auth.doSignInWithEmailAndPassword(val.email, val.password)));
  }

  forgotPassReRoute() {
    const {email, reRouteAndAutofill} = this.props
    reRouteAndAutofill(email, "reset", "forms.reset.email")
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
      passwordIsValid,
      pending,
      reRouteAndAutofill,
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
      autoFocus: false,
      fullWidth: true
    };
    const passwordConfig = {
      label: "password",
      type: "password",
      fullWidth: true
    };

    return (
      <div className={pageWrapper}>
        <h3 className={headerTitle}>sign in</h3>

        <Form
          model="forms.signIn"
          onSubmit={val => this.submitSignIn(val)}
          className={formWrapper}>
          <RRFInput
            {...emailConfig}
            autoComplete="yes"
            errorMessages={error.emailErrors}
            errors={emailErrors}
            isValid={emailIsValid}
            model="forms.signIn.email"
            reRouteAndAutofill={reRouteAndAutofill}
            validators={validate.emailRules(email)}
            value={email}/>
          <RRFInput
            {...passwordConfig}
            autoComplete="current-password"
            model="forms.signIn.password"
            isValid={passwordIsValid}
            errorMessages={error.passwordErrors}/> {errors
            ? (
              <div className="validationErrorWrapper">
                <span>{errors}</span>
              </div>
            )
            : null}
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
                : formIsValid
                  ? (
                    <i className="material-icons">check</i>
                  )
                  : (
                    <i className="material-icons">clear</i>
                  )}
          </Button>
          <div
            className={forgotPassword}
            onClick={this
            .forgotPassReRoute
            .bind(this)}>forgot password?</div>
        </Form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInPage);
