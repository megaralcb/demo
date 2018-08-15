import React from "react";

//Deps
import classNames from "classnames";

const Input = props => {
  const {
    autoFocus,
    barClass,
    changeHandler,
    defaultValue,
    inputClass,
    isMobile,
    label,
    max,
    min,
    required,
    type
  } = props;

  //Classes
  const defaultBarClass = classNames({
    bar: true,
    isMobile
  });
  const highlight = classNames({
    highlight: true,
    isMobile
  });
  const defaultClass = classNames({
    inputClass: true,
    isMobile
  });
  const labelClass = classNames({
    labelClass: true,
    isMobile
  });
  return (
    <div className="quantityGroup">
      <input
        required={required || true}
        className={inputClass ? inputClass : defaultClass}
        defaultValue={defaultValue ? defaultValue : ""}
        type={type ? type : "string"}
        min={min ? min : "0"}
        max={max ? max : "50"}
        onChange={changeHandler ? changeHandler : null}
        autoFocus={autoFocus ? autoFocus : false}
      />
      <span className={highlight} />
      <span className={barClass ? barClass : defaultBarClass} />
      <label className={labelClass}>{label ? label : required ? required : "required"}</label>
    </div>
  );
};

export default Input;
