import { getGiveAmt } from "./../helpers/calc";

export const getCategory = data => {
  const category = data.tags.filter(a => a.includes("cat"));
  return category.length > 0 ? category[0].substr(3) : null;
};

export const getDescription = data => {
  return data.caption ? data.caption.text : null;
};

export const getDiscount = data => {
  const disc = data.tags.filter(a => a.includes("disc"));
  return disc.length > 0 ? Number(disc[0].substr(4)).toFixed(2) : null;
};

export const getDiscountedPrice = (price, discount) => {
  const discountedPrice = price - price * (discount / 100);
  return discount && Number(price) ? Number(discountedPrice.toFixed(2)) : null;
};

export const getFeatured = data => {
  const feat = data.tags.filter(a => a.includes("feat"));
  return feat.length > 0 ? feat[0].substr(4) : null;
};

export const getGive = data => {
  const give = data.tags.filter(a => a.includes("give"));
  return give.length > 0 ? Number(give[0].substr(4)).toFixed(2) : null;
};

export const getImages = data => {
  return data.images;
};

export const getPrice = data => {
  const price = data.tags.filter(a => a.includes("price"));
  return price.length > 0 ? Number(price[0].substr(5)).toFixed(2) : null;
};
export const getRun = data => {
  const run = data.tags.filter(a => a.includes("run"));
  return run.length > 0 ? Number(run[0].substr(3)).toFixed(2) : null;
};

export const getTitle = data => {
  const title = data.tags.filter(a => a.includes("title"));
  return title.length > 0 ? title[0].substr(5) : null;
};

export const getConfig = data => {
  const price = getPrice(data);
  const give = getGive(data);
  const discount = getDiscount(data);
  return {
    category: getCategory(data),
    description: getDescription(data),
    discount,
    discountedPrice: getDiscountedPrice(price, discount),
    featured: getFeatured(data),
    give: getGive(data),
    giveValue: getGiveAmt(price, give),
    id: data.id,
    images: getImages(data),
    price,
    quantity: 1,
    run: getRun(data),
    title: getTitle(data)
  };
};
