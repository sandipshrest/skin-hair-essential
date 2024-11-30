// function to calculate discounted price
const calculateDiscountedPrice = (price, discount = 0) => {
  return price - (price * discount) / 100;
};

export default calculateDiscountedPrice;
