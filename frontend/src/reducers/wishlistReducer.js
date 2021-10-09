import {
  ADD_PRODUCT_TO_WISHLIST,
  LOAD_LOCAL_STORAGE,
  REMOVE_PRODUCT_FROM_WISHLIST,
} from '../actions/types';

export const wishlistReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_LOCAL_STORAGE:
      return action.payload.localWishlist;
    case ADD_PRODUCT_TO_WISHLIST:
      // -------加入localhost後把修改wishlist的部分移到action creator裡面 action.payload直接是修改後的wishlist
      return action.payload;
    case REMOVE_PRODUCT_FROM_WISHLIST:
      // -------加入localhost後把修改wishlist的部分移到action creator裡面 action.payload直接是修改後的wishlist
      // const { [action.payload]: removedProduct, ...otherProducts } = state;
      return action.payload;
    default:
      return state;
  }
};
