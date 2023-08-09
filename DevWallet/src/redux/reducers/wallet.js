import { FETCH_CURRENCIES,
  SAVED_EXPENSE,
  EXPENSE_TO_DELETE,
  EXPENSE_TO_EDIT,
  EDITED_EXPENSE,
  ERROR,

} from '../actions';

const initialStateValues = {
  currencies: [],
  expenses: [],
  expenseToEdit: {},
  editing: false,
  error: '',
};

const wallet = (state = initialStateValues, action) => {
  switch (action.type) {
  case ERROR: return {
    ...state,
    error: action.payload,
  };
  case FETCH_CURRENCIES: return {
    ...state,
    currencies: action.payload,
  };
  case SAVED_EXPENSE: return {
    ...state,
    expenses: [...state.expenses, action.payload],
  };
  case EXPENSE_TO_DELETE: return {
    ...state,
    expenses: action.payload,
  };
  case EXPENSE_TO_EDIT: return {
    ...state,
    expenseToEdit: action.payload,
    editing: true,
  };
  case EDITED_EXPENSE: return {
    ...state,
    expenses: state.expenses
      .map((expense) => (expense.id === state.expenseToEdit.id
        ? ({ id: expense.id,
          ...action.payload,
          exchangeRates: expense.exchangeRates })
        : expense)),
    editing: false,
    expenseToEdit: {},
  };
  default: return state;
  }
};

export default wallet;
