import React from "react";

//Deps
import classNames from "classnames";

const wrapImage = classname => WrappedComponent => {
  const imageWrapper = classNames({
    imageWrapper: true,
    [`${classname}`]: true
  });
  const WrappedProduct = props => {
    return (
      <div className={imageWrapper}>
        <WrappedComponent {...props} />
      </div>
    );
  };
  return WrappedProduct;
};

export default wrapImage;
