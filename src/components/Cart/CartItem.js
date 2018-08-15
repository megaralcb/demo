import React from "react";

//Deps
import classNames from "classnames";

//MUI
// import Button from "material-ui/Button";
// import red from "material-ui/colors/red";

const CartItem = props => {
  const { description, images, isActive } = props;

  const cartItem = classNames({
    cartItem: true
  });
  const cartImage = classNames({
    cartImage: true
  });
  const removeItemButton = classNames({
    removeItemButton: true,
    isActive: isActive
  });

  return (
    <div className={cartItem}>
      <img
        className={cartImage}
        src={images.thumbnail.url}
        alt={description ? description : "Photo taken from Instagram"}
      />
      <div className={removeItemButton} />
    </div>
  );
};

export default CartItem;
