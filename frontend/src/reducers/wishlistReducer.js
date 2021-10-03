import {
  ADD_PRODUCT_TO_WISHLIST,
  REMOVE_PRODUCT_FROM_WISHLIST,
} from '../actions/types';

export const wishlistReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_PRODUCT_TO_WISHLIST:
      return { ...state, [action.payload._id]: action.payload };
    case REMOVE_PRODUCT_FROM_WISHLIST:
      const { [action.payload]: removedProduct, ...otherProducts } = state;
      return otherProducts;
    default:
      return state;
  }
};
