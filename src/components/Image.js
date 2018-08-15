import React from "react";
import classNames from "classnames";

const imageComponentContainer = classNames({
  imageComponentContainer: true
});
const image = classNames({
  image: true
});

const Image = props => {
  const { description, images } = props;
  return (
    <div className={imageComponentContainer}>
      <img
        className={image}
        src={images.thumbnail.url}
        alt={description ? description : "Photo taken from Instagram"}
      />
    </div>
  );
};

export default Image;
