export const ITEMS_PER_PAGE = 8;

// for calculate discounted Price
export function discountedPrice(item) {
  // Math.round function nu 6e ,,2)
  return Math.round(item.price * (1 - item.discountedPrice / 100), 2);
}
