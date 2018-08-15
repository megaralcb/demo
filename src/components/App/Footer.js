import React from "react";
import classNames from "classnames";

const Footer = props => {
  const footerContainer = classNames({
    footerContainer: true
  });
  return <div className={footerContainer} />;
};

export default Footer;
