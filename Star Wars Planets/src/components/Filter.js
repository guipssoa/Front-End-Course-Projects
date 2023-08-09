import React, { useContext } from 'react';
import Context from '../context/Context';

function Filter() {
  const {
    filterNames, filterClasses, filterSelected, filterNumbers, valuesOptions,
    selectedFilter, deleteFilter, removeAllFilter,
  } = useContext(Context);

  return (
    <div>

      <input
        data-testid="name-filter"
        name="name-filter"
        type="text"
        placeholder="Planet name"
        onChange={ filterNames }
      />

      <select
        data-testid="column-filter"
        name="column"
        type="select"
        onChange={ filterClasses }
      >
        {
          valuesOptions.map((param) => (
            <option
              key={ param }
              value={ param }
            >
              { param }
            </option>
          ))
        }
      </select>

      <select
        data-testid="comparison-filter"
        name="comparison"
        type="select"
        onChange={ filterClasses }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>

      <input
        data-testid="value-filter"
        name="number"
        type="number"
        value={ filterNumbers.number }
        onChange={ filterClasses }
      />

      <button
        onClick={ filterSelected }
        data-testid="button-filter"
      >
        Filtrar
      </button>

      <button
        onClick={ () => removeAllFilter() }
        data-testid="button-remove-filters"
      >
        Remover Filtros
      </button>

      {
        selectedFilter?.map((param1, param2) => (
          <div
            key={ param2 }
            data-testid="filter"
          >
            <span>{ `${param1.column} ${param1.comparison} ${param1.number}` }</span>
            <button
              onClick={ () => deleteFilter(param1) }
            >
              Apagar filtro
            </button>

          </div>
        ))
      }
    </div>
  );
}

export default Filter;
