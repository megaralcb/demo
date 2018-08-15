import React from "react";

//Component
import Input from "./../../components/Inputs/Input";
import Prices from "./../Store/Prices";

//Deps
//MUI
import Button from "material-ui/Button";
import green from "material-ui/colors/green";
import red from "material-ui/colors/red";
import classNames from "classnames";

const CheckoutSummary = props => {
  const { cartSubTotal, changeQuantity, isMobile, items } = props;
  //Item Row
  const itemRowContainer = classNames({
    itemRowContainer: true
  });
  //Image
  const imageLockup = classNames({
    imageLockup: true
  });
  const checkoutSummaryImage = classNames({
    checkoutSummaryImage: true
  });
  //Quantity, Price, Discount
  const itemRowWrapper = classNames({
    itemRowWrapper: true
  });
  const itemRowLockup = classNames({
    itemRowLockup: true
  });
  const discountTotal = classNames({
    discountTotal: true
  });
  const subTotal = classNames({
    subTotal: true,
    isMobile
  });
  const footerBlocker = classNames({
    footerBlocker: true
  });

  const itemRow = items.map((a, i) => {
    //Input Config
    const inputClass = classNames({
      inputClass: true,
      isMobile
    });
    const inputConfig = {
      defaultValue: a.quantity,
      inputClass: inputClass,
      label: "quantity",
      type: "number",
      value: a.quantity,
      changeHandler: (e, meta) => changeQuantity(Number(e.target.value), { item: a, items })
    };

    //Data Classes
    const discountLockup = classNames({
      discountLockup: true,
      isInactive: a.quantity === 0
    });
    //Data Classes
    const deleteIcon = classNames({
      deleteIcon: true,
      isInactive: a.quantity > 0
    });

    return (
      <div className={itemRowWrapper} key={`${a.id}_input`}>
        <div className={imageLockup}>
          <img
            className={checkoutSummaryImage}
            src={a.images.thumbnail.url}
            alt={a.description ? a.description : "Image from instagram"}
          />
        </div>
        <div className={itemRowLockup}>
          <Input {...props} item={a} quantity={a.quantity} {...inputConfig} />
          <Prices {...this.props} item={a} />
        </div>
        <div className={discountTotal}>
          {a.quantity ? (
            <div className={discountLockup}>
              {a.discountedPrice
                ? `$${(a.discountedPrice * a.quantity).toFixed(2)}`
                : `$${(a.price * a.quantity).toFixed(2)}`}
            </div>
          ) : (
            <div className={deleteIcon}>
              <Button
                variant="raised"
                style={{ backgroundColor: red["200"] }}
                onClick={() => props.removeFromCart(a.id, items)}>
                <i className="material-icons">delete</i>
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  });

  return (
    <div className={itemRowContainer}>
      {itemRow}
      <div className={footerBlocker} />
      <div className={subTotal}>
        <Button
          variant="raised"
          style={{
            backgroundColor: green["200"],
            width: "100%",
            padding: "1em",
            fontWeight: "700"
          }}
          onClick={() => console.log("waffles")}>
          <div style={{ width: "100%" }}>total</div>
          <div style={{ width: "100%" }}>{`$${cartSubTotal.toFixed(2)}`}</div>
        </Button>
      </div>
    </div>
  );
};

export default CheckoutSummary;
