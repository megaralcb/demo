import * as ACTIONS from "./../actions/actionConstants";

const initialState = {
  userAuth: {},
  currentUser: {
    username: null,
    firstname: null,
    email: null
  },
  errors: ""
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.SET_USER_DATA:
      {
        return {
          ...state,
          userAuth: action.payload,
          errors: ""
        };
      }

    case ACTIONS.SET_USER_ERROR_DATA:
      {
        return {
          ...state,
          errors: action.payload
        };
      }
    case ACTIONS.UPDATE_USER:
      {
        return {
          ...state,
          currentUser: {
            ...state.currentUser,
            ...action.payload
          }
        };
      }
    default:
      {
        return state;
      }
  }
};

export default userReducer;
