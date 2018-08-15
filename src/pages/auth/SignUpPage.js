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
import {getNames} from "./util/getNames";
import {push} from "react-router-redux";

//Firebase
import {auth} from "./../../firebase";

function mapStateToProps(state) {
  return {
    //User
    user: state.user.userAuth,

    //Form Values
    email: state.forms.signUp.email,
    name: state.forms.signUp.name,
    password: state.forms.signUp.password,
    passwordConfirm: state.forms.signUp.passwordConfirm,

    //Form State
    pending: state.forms.forms.signUp.$form.pending,
    submitted: state.forms.forms.signUp.$form.submitted,
    submitFailed: state.forms.forms.signUp.$form.submitFailed,
    validating: state.forms.forms.signUp.$form.validating,

    //Validation
    emailIsValid: state.forms.forms.signUp.email.valid,
    formIsValid: state.forms.forms.signUp.$form.valid,
    passwordIsValid: state.forms.forms.signUp.password.valid,
    passwordConfirmIsValid: state.forms.forms.signUp.passwordConfirm.valid,

    //Reducer Props
    errors: state.user.errors,
    isMobile: state.app.deviceType === "mobile",

    //Errors
    emailErrors: state.forms.forms.signUp.email.errors,
    formErrors: state.forms.forms.signUp.$form.errors,
    passwordErrors: state.forms.forms.signUp.password.errors,
    passwordConfirmErrors: state.forms.forms.signUp.passwordConfirm.errors
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    reRouteAndAutofill: (email, route, model) => dispatch({
      type: ACTIONS.ROUTE_AND_AUTOFILL,
      payload: {
        route: push(route),
        email: email,
        model: model
      }
    }),
    redirectHome: () => dispatch(push("home"))
  };
}

class SignUpPage extends Component {
  //Methods
  submitSignUp(data) {
    const {dispatch} = this.props;
    //Generate name
    const firstname = getNames(data.name);

    dispatch({
      type: ACTIONS.SUBMIT_USER_DATA,
      payload: {
        meta: {
          data: {
            ...data,
            firstname
          },
          dispatches: () => dispatch(actions.submit("forms.signUp", auth.doCreateUserWithEmailAndPassword(data.email, data.password))),
          type: "user_name"
        }
      }

    })
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
      name,
      password,
      passwordIsValid,
      passwordConfirm,
      passwordConfirmIsValid,
      pending,
      reRouteAndAutofill,
      submitted,
      submitFailed,
      validating
    } = this.props;

    //Classes
    const pageWrapper = classNames({pageWrapper: true});
    const headerTitle = classNames({headerTitle: true});
    const formWrapper = classNames({formWrapper: true, isMobile});
    const loading = classNames({"material-icons": true, spin: true});

    //Input configs
    const emailConfig = {
      label: "email",
      type: "email",
      fullWidth: true
    };
    const nameConfig = {
      label: "full name",
      type: "username",
      fullWidth: true
    };
    const passwordConfig = {
      label: "password",
      type: "password",
      fullWidth: true
    };
    const passwordConfirmConfig = {
      label: "confirm password",
      type: "password",
      fullWidth: true
    };

    return (
      <div className={pageWrapper}>
        <h3 className={headerTitle}>sign up</h3>

        <Form
          model="forms.signUp"
          onSubmit={value => this.submitSignUp(value)}
          className={formWrapper}
          validators={validate.formRules(password, passwordConfirm, email)}>
          <RRFInput
            {...nameConfig}
            autoComplete="yes"
            model="forms.signUp.name"
            value={name}/>
          <RRFInput
            {...emailConfig}
            autoComplete="yes"
            errorMessages={error.emailErrors}
            errors={emailErrors}
            isValid={emailIsValid}
            model="forms.signUp.email"
            reRouteAndAutofill={reRouteAndAutofill}
            validators={validate.emailRules(email)}
            value={email}/>
          <RRFInput
            {...passwordConfig}
            autoComplete="current-password"
            model="forms.signUp.password"
            isValid={passwordIsValid}
            validators={validate.passwordRules(password, email)}
            errorMessages={error.passwordErrors}/>
          <RRFInput
            {...passwordConfirmConfig}
            model="forms.signUp.passwordConfirm"
            isValid={passwordConfirmIsValid}
            validators={validate.passwordConfirmRules(password, passwordConfirm)}
            errorMessages={error.passwordConfirmErrors}/> {errors
            ? (
              <div className="validationErrorWrapper">
                <span>{errors}</span>
              </div>
            )
            : null}
          <Button
            color="primary"
            style={submitted || formIsValid
            ? {
              padding: "1em",
              backgroundColor: "#a5d6a7",
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);
