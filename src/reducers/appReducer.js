import * as ACTIONS from "./../actions/actionConstants";

const initialState = {
  init: false,
  activeFilter: "all",
  deviceType: null,
  filterBarIsExpanded: false,
  mobileHeaderActive: false
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.MOBILE_HEADER_ACTIVE: {
      return {
        ...state,
        mobileHeaderActive: action.payload
      };
    }
    case ACTIONS.CHECK_DEVICE: {
      return {
        ...state,
        deviceType: action.payload
      };
    }
    case ACTIONS.NEW_FILTER: {
      return {
        ...state,
        activeFilter: action.payload
      };
    }
    case ACTIONS.TOGGLE_FILTER_BAR: {
      return {
        ...state,
        filterBarIsExpanded: action.payload
      };
    }
    default: {
      return state;
    }
  }
};

export default appReducer;
