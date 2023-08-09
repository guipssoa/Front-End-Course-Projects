import fetchApi from '../../apiServices/walletApi';

export const LOGIN_WALLET = 'LOGIN_WALLET';
export const FETCH_CURRENCIES = 'GET_CURRENCIES';
export const SAVED_EXPENSE = 'SAVED_EXPENSE';
export const EXPENSE_TO_DELETE = 'EXPENSE_TO_DELETE';
export const EXPENSE_TO_EDIT = 'EXPENSE_TO_EDIT';
export const EDITED_EXPENSE = 'EDITED_EXPENSE';
export const ERROR = 'ERROR';

const errorReturned = (messageError) => ({
  type: ERROR,
  payload: messageError,
});

export const loginWallet = (email) => async (dispatch) => {
  dispatch({
    type: LOGIN_WALLET,
    payload: email,
  });
};

export const fetchCurrencies = () => async (dispatch) => {
  try {
    const currencies = Object.keys(await fetchApi());
    currencies.splice(currencies.indexOf('USDT'), 1);

    dispatch({
      type: FETCH_CURRENCIES,
      payload: currencies,
    });
  } catch (error) {
    dispatch(errorReturned(error));
  }
};

export const savedExpense = (expense) => async (dispatch) => {
  try {
    dispatch({
      type: SAVED_EXPENSE,
      payload: expense,
    });
  } catch (error) {
    dispatch(errorReturned(error));
  }
};

export const expenseToDelete = (expenses) => async (dispatch) => {
  dispatch({
    type: EXPENSE_TO_DELETE,
    payload: expenses,
  });
};

export const expenseToEdit = (expenseEdit) => async (dispatch) => {
  dispatch({
    type: EXPENSE_TO_EDIT,
    payload: expenseEdit,
  });
};

export const editExpense = (expenseValues) => async (dispatch) => {
  dispatch({
    type: EDITED_EXPENSE,
    payload: expenseValues,
  });
};
