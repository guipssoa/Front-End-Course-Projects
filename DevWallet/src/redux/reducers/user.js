import { LOGIN_WALLET } from '../actions';

const initialStateValues = {
  email: '',
};

const user = (state = initialStateValues, action) => {
  switch (action.type) {
  case LOGIN_WALLET: return {
    ...state,
    email: action.payload,
  };
  default: return state;
  }
};

export default user;
