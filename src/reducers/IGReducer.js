import * as ACTIONS from "./../actions/actionConstants";

const initialState = {
  data: { data: [] },
  error: null,
  fetched: false,
  fetching: false,
  sorting: false,
  sorted: false
};

export default function IGReducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.GET_RECENT_IMAGES_PENDING: {
      return {
        ...state,
        fetching: true
      };
    }
    case ACTIONS.GET_RECENT_IMAGES_FULFILLED: {
      return {
        ...state,
        fetching: false,
        fetched: true,
        data: action.payload
      };
    }
    case ACTIONS.GET_RECENT_IMAGES_REJECTED: {
      return {
        ...state,
        fetching: false,
        fetched: false,
        data: null,
        error: action.payload
      };
    }
    case ACTIONS.SORT_IMAGES_PENDING: {
      return {
        ...state,
        sorting: true
      };
    }
    case ACTIONS.SORT_IMAGES_FULFILLED: {
      return {
        ...state,
        sorting: false,
        sorted: true
      };
    }

    default: {
      return state;
    }
  }
}
