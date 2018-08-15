import * as ACTIONS from "./../actions/actionConstants";

const initialState = {
  products: []
};

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.CREATE_PRODUCT_FROM_IMAGE: {
      return {
        ...state,
        products: [...state.products, action.payload]
      };
    }
    default: {
      return state;
    }
  }
}
