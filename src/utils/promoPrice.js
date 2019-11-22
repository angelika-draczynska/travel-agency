export const promoPrice = (price, percent) => {
  
  return price - (price / 100 * percent);
};
