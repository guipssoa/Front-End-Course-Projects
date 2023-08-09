import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { act } from 'react-dom/test-utils';
import testData from '../../cypress/mocks/testData';

describe('60% coverage test', () => {
  beforeEach( async () => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue(testData)
    });
    await act(async () => {
      render(
        <App />
      )   
    })
  })
  afterEach(() => jest.restoreAllMocks());

  test('Test buttons and inputs', async () => {
    await waitFor(() => {
      expect(fetch).toHaveBeenCalled()
    });
    const button = screen.getByRole('button', {
      name: /filtrar/i
    });
    const input = screen.getByTestId("name-filter");
    const column = screen.getByTestId("column-filter");
    const comparison = screen.getByTestId("comparison-filter");
    const number = screen.getByTestId("value-filter");
    const buttonRemoveFilter = screen.getByRole('button', {
      name: /remover filtros/i
    });
    expect(input).toBeInTheDocument();
    expect(column).toBeInTheDocument();
    expect(comparison).toBeInTheDocument();
    expect(number).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(buttonRemoveFilter).toBeInTheDocument();
  })

  test('Test filter name', async () => {
    await waitFor(() => {
      expect(fetch).toHaveBeenCalled()
    });
    const input = screen.getByTestId("name-filter");
    act(() => {
      userEvent.type(input, 'tatooine');
    })
    const planet = screen.getByRole('cell', {
      name: /tatooine/i
    });
    expect(planet).toBeInTheDocument();
  })

  test('Test filter dropdown', async () => {
    await waitFor(() => {
      expect(fetch).toHaveBeenCalled()
    });
    const column = screen.getByTestId("column-filter");
    const comparison = screen.getByTestId("comparison-filter");
    const number = screen.getByTestId("value-filter");
    const button = screen.getByRole('button', {
      name: /filtrar/i
    });
    act(() => {
      userEvent.selectOptions(column, 'rotation_period');
      userEvent.selectOptions(comparison, 'igual a');
      userEvent.type(number, '23');
      userEvent.click(button);
    })
    const buttonFilter = screen.getByRole('button', {
      name: /apagar filtro/i
    })
    const tatooine = screen.getByRole('cell', {
      name: /tatooine/i
    });
    const hoth = screen.getByRole('cell', {
      name: /hoth/i
    });
    const dagobah = screen.getByRole('cell', {
      name: /dagobah/i
    });
    expect(buttonFilter).toBeInTheDocument();
    expect(tatooine).toBeInTheDocument();
    expect(hoth).toBeInTheDocument();
    expect(dagobah).toBeInTheDocument();
    userEvent.click(buttonFilter);
    const bespin = screen.getByRole('cell', {
      name: /bespin/i
    });
    expect(bespin).toBeInTheDocument();
  })

  test("Test more filters", async () => {
    await waitFor(() => {
      expect(fetch).toHaveBeenCalled()
    });
    const column = screen.getByTestId("column-filter");
    const comparison = screen.getByTestId("comparison-filter");
    const number = screen.getByTestId("value-filter");
    const button = screen.getByTestId("button-filter");

    act(() => {
      userEvent.selectOptions(column, "diameter");
      userEvent.selectOptions(comparison, 'maior que');
      userEvent.type(number, '8900');
      userEvent.click(button);
      userEvent.clear(number);
      userEvent.selectOptions(column, "population");
      userEvent.selectOptions(comparison, 'menor que');
      userEvent.type(number, '10000000');
      userEvent.click(button);
    });

    const filterSelected = screen.getAllByTestId("filter");
    expect(filterSelected).toHaveLength(2);

    const buttonRemoveFilter = screen.getByRole('button', {
      name: /apagar filtro/i
    });
    userEvent.click(buttonRemoveFilter[1]);
    expect(filterSelected).toHaveLength(1);
  });

  
  test('Test table', async () => {
    await waitFor(() => {
      expect(fetch).toHaveBeenCalled()
    });
    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();
  })

});
 