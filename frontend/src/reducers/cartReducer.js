import {
  ADD_PRODUCT_TO_CART,
  EDIT_PRODUCT_IN_CART,
  LOAD_LOCAL_STORAGE,
  REMOVE_PRODUCT_FROM_CART,
} from '../actions/types';

export const cartReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_LOCAL_STORAGE:
      return action.payload.localCart;
    case ADD_PRODUCT_TO_CART:
      // -------加入localhost後把修改cart的部分移到action creator裡面 action.payload直接是修改後的cart
      // const { [action.payload._id]: foundCartProduct } = state;
      // const newProduct = action.payload;
      // // 如果在原cart中找到有相同商品(foundCartProduct)時,把新進來的(newProduct)amount加上原有商品的amount
      // if (foundCartProduct) newProduct.amount += foundCartProduct.amount;
      // -------------
      return action.payload;
    case REMOVE_PRODUCT_FROM_CART:
      // -------加入localhost後把修改cart的部分移到action creator裡面 action.payload直接是修改後的cart
      // const { [action.payload]: removedProduct, ...otherProducts } = state;

      return action.payload;
    case EDIT_PRODUCT_IN_CART:
      // -------加入localhost後把修改cart的部分移到action creator裡面 action.payload直接是修改後的cart
      // const editedProduct = state[action.payload.id];
      // editedProduct.amount = action.payload.amount;

      return action.payload;
    default:
      return state;
  }
};
