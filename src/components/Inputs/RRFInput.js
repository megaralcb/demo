import React from "react";

//Deps
import classNames from "classnames";
import {Control, Errors} from "react-redux-form";

const Input = props => {
  const {
    autoComplete,
    autoFocus,
    errorMessages,
    isMobile,
    isValid,
    fullWidth,
    label,
    model,
    required,
    type,
    validators
  } = props;

  //Classes
  const validationGroup = classNames({validationGroup: true, isValid});
  const defaultBarClass = classNames({validationBar: true, isValid, fullWidth, isMobile});
  const highlight = classNames({highlight: true, isValid, fullWidth, isMobile});
  const defaultClass = classNames({inputValidation: true, fullWidth, isValid, isMobile});
  const labelClass = classNames({labelClass: true, fullWidth, isValid, isMobile});

  // Add sign up link if email not found const goToSignInLink =
  // classNames({goToSignInLink: true});

  return (
    <div className={validationGroup}>
      <Control.text
        autoComplete={autoComplete}
        autoFocus={autoFocus
        ? autoFocus
        : false}
        spellCheck="false"
        className={defaultClass}
        type={type
        ? type
        : "string"}
        model={model}
        required={required
        ? required
        : true}
        validators={validators}/>
      <span className={highlight}/>
      <span className={defaultBarClass}/>
      <label className={labelClass}>{label
          ? label
          : "entry"}</label>
      <Errors
        model={model}
        messages={errorMessages}
        show={{
        touched: true,
        focus: false
      }}
        wrapper={props => <div className="validationErrorWrapper">{props.children}</div>}/>
    </div>
  );
};

export default Input;
