import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

const inputEmail = 'email-input';
const inputPassword = 'password-input';

describe('60% + Coverage tests', () => {
  test('Verificar email placeholder', () => {
    renderWithRouterAndRedux(<App />);
    const placeholderEmail = screen.getByPlaceholderText(/Email/i);
    expect(placeholderEmail).toBeInTheDocument();
  });

  test('Verificar password placeholder', () => {
    renderWithRouterAndRedux(<App />);
    const placeholderPass = screen.getByPlaceholderText(/Password/i);
    expect(placeholderPass).toBeInTheDocument();
  });

  test('Verificar password input', () => {
    renderWithRouterAndRedux(<App />);
    const testInputPassword = screen.getByTestId(inputPassword);
    expect(testInputPassword).toBeInTheDocument();
  });

  test('Verificar login input', () => {
    renderWithRouterAndRedux(<App />);
    const testEmailInput = screen.getByTestId(inputEmail);
    expect(testEmailInput).toBeInTheDocument();
  });

  test('Verificar botão "Entrar" no Login', () => {
    renderWithRouterAndRedux(<App />);
    const buttonEnter = screen.getByRole('button', {
      name: /entrar/i,
    }); expect(buttonEnter).toBeInTheDocument();
  });

  test('Verificar se botão "Entrar" inicia disabled', () => {
    renderWithRouterAndRedux(<App />);
    const button = screen.getByRole('button', {
      name: /entrar/i,
    }); expect(button).toHaveAttribute('disabled');
  });

  test('Verificar path "/"', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    expect(history.location.pathname).toBe('/');
  });

  test('Verificar path "carteira"', () => {
    const { history } = (renderWithRouterAndRedux(<App />));
    act(() => { history.push('/carteira'); });
    expect(history.location.pathname).toBe('/carteira');
  });

  test('Testes de inputs login.', () => {
    const { history, store } = renderWithRouterAndRedux(<App />);
    const buttonEnter = screen.getByRole('button', { name: /entrar/i });
    const testEmailInput = screen.getByTestId(inputEmail);
    const testInputPassword = screen.getByTestId(inputPassword);
    expect(buttonEnter).toBeDisabled();
    userEvent.click(buttonEnter);
    userEvent.type(testEmailInput, 'tryber');
    userEvent.type(testInputPassword, '1234');
    expect(buttonEnter).toBeDisabled();
    userEvent.type(testEmailInput, 'email@trybe.com');
    userEvent.type(testInputPassword, '1234567');
    expect(buttonEnter).not.toBeDisabled();
    act(() => userEvent.click(buttonEnter));
    const getStore = store.getState().user.email;
    expect(history.location.pathname).toBe('/carteira');
    expect(getStore).toBe('tryberemail@trybe.com');
  });

  test('Testes de inputs wallet', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => { history.push('/carteira'); });
    expect(history.location.pathname).toBe('/carteira');
    const inputValueWallet = screen.getByPlaceholderText('Valor');
    const input = screen.getByPlaceholderText('Descrição');
    const addExpensesBtn = screen.getByRole('button', { name: /adicionar despesa/i });
    userEvent.type(inputValueWallet, '55');
    userEvent.type(input, 'Lanchonete');
    userEvent.click(addExpensesBtn);
    await waitFor(() => {
      const editButton = screen.getAllByTestId('edit-btn');
      userEvent.click(editButton[0]);
    });
    const inputValueEdit = screen.getByTestId('value-input');
    const descriptionEdit = screen.getByTestId('description-input');
    const currencyEdit = screen.getByTestId('currency-input');
    const methodEdit = screen.getByTestId('method-input');
    const tagEdit = screen.getByTestId('tag-input');
    const endEdit = screen.getByRole('button', { name: /editar despesa/i });
    expect(inputValueEdit).toBeInTheDocument();
    expect(descriptionEdit).toBeInTheDocument();
    expect(currencyEdit).toBeInTheDocument();
    expect(methodEdit).toBeInTheDocument();
    expect(tagEdit).toBeInTheDocument();
    expect(endEdit).toBeInTheDocument();
    userEvent.clear(inputValueEdit);
    userEvent.clear(descriptionEdit);
    userEvent.type(inputValueEdit, '35');
    userEvent.type(descriptionEdit, 'Cinema');
    await waitFor(() => {
      userEvent.selectOptions(currencyEdit, 'ETH');
      userEvent.selectOptions(methodEdit, 'Dinheiro');
      userEvent.selectOptions(tagEdit, 'Lazer');
    });
    userEvent.click(endEdit);
    await waitFor(() => {
      const editedDescription = screen.getByRole('cell', { name: /cinema/i });
      const editedValue = screen.getByRole('cell', { name: /35\.00/i });
      const editedCurrency = screen.getByRole('cell', { name: /ethereum\/real brasileiro/i });
      const editedMethod = screen.getByRole('cell', { name: /dinheiro/i });
      const editedTag = screen.getByRole('cell', { name: /lazer/i });
      expect(editedDescription).toBeInTheDocument();
      expect(editedValue).toBeInTheDocument();
      expect(editedCurrency).toBeInTheDocument();
      expect(editedMethod).toBeInTheDocument();
      expect(editedTag).toBeInTheDocument();
    });
  });

  test('Verificar o estado inicial do Header', () => {
    const { history } = (renderWithRouterAndRedux(<App />));
    act(() => { history.push('/carteira'); });
    expect(history.location.pathname).toBe('/carteira');
    const emailHeader = screen.getByTestId('email-field');
    expect(emailHeader).toHaveTextContent('');
    const valueTotalExpeses = screen.getByTestId('total-field');
    expect(valueTotalExpeses).toHaveTextContent('0.00');
    const headerCurrency = screen.getByTestId('header-currency-field');
    expect(headerCurrency).toBeInTheDocument();
    expect(headerCurrency).toHaveTextContent('BRL');
  });
});
