import {
  ADD_PRODUCT_TO_CART,
  EDIT_PRODUCT_IN_CART,
  REMOVE_PRODUCT_FROM_CART,
} from '../actions/types';

export const cartReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_PRODUCT_TO_CART:
      const { [action.payload._id]: foundCartProduct } = state;
      const newProduct = action.payload;
      // 如果在原cart中找到有相同商品(foundCartProduct)時,把新進來的(newProduct)amount加上原有商品的amount
      if (foundCartProduct) newProduct.amount += foundCartProduct.amount;

      return { ...state, [action.payload._id]: newProduct };
    case REMOVE_PRODUCT_FROM_CART:
      const { [action.payload]: removedProduct, ...otherProducts } = state;
      return otherProducts;
    case EDIT_PRODUCT_IN_CART:
      const editedProduct = state[action.payload.id];
      editedProduct.amount = action.payload.amount;
      console.log(editedProduct);

      return { ...state, [action.payload.id]: editedProduct };
    default:
      return state;
  }
};
