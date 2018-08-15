import React from "react";
import classNames from "classnames";

const Prices = props => {
  const { isCentered, isMobile, item } = props;
  const discountWrapper = classNames({
    discountWrapper: true,
    isCentered: isCentered
  });
  const priceDiscounts = classNames({
    priceDiscounts: item.discount,
    isMobile
  });
  const discountedPrice = classNames({
    discountedPrice: item.discountedPrice,
    isMobile
  });

  return (
    <div className={discountWrapper}>
      {item.discount ? (
        <div>
          <div className={priceDiscounts}>
            {item.price ? `$${Number(item.price).toFixed(2)}` : null}
          </div>
          <div className={discountedPrice}>
            {item.discountedPrice ? `$${item.discountedPrice.toFixed(2)}` : null}
          </div>
        </div>
      ) : (
        <div>
          <div className={priceDiscounts}>{item.price ? `$${item.price}` : null}</div>
        </div>
      )}
    </div>
  );
};

export default Prices;
