export const getGiveAmt = (price, give) => {
  return give && price ? price * (give / 100) : null;
};

export const getProfit = (price, discount, give) => {
  return price - discount - give;
};
