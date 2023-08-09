/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import { useEffect, useState, useMemo } from 'react';
import Context from './Context';
import useFetch from '../hooks/useFetch';

function Provider({ children }) {
  const [planetList, setPlanetList] = useState([]);

  const [dataFetch, setDataFetch] = useState([]);

  const [planetsFilterInState, setplanetsFilterInState] = useState([]);

  const [selectedFilter, setselectedFilter] = useState([]);

  const [planetsListInFilter, setPlanetsListInFilter] = useState(false);

  const { inLoad, makeFetch } = useFetch();

  const [filterNumbers, setFilterNumbers] = useState({
    column: 'population',
    comparison: 'maior que',
    number: 0,
  });

  const [valuesOptions, setValuesOptions] = useState([
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water']);

  useEffect(() => {
    const responseApi = async (url) => {
      const responseFetch = await makeFetch(url);
      responseFetch.results.forEach((param) => delete param.residents);
      setDataFetch(responseFetch);
      setplanetsFilterInState(responseFetch.results);
    };
    responseApi('https://swapi.dev/api/planets');
  }, []);

  const handleChange = (param) => {
    const { value } = param.target;
    return value;
  };

  const filterNames = (param) => {
    setPlanetsListInFilter(true);
    const planet = handleChange(param);
    const { results } = dataFetch;
    const newFilter = results.filter((filterParam) => filterParam.name.toLowerCase()
      .includes(planet.toLowerCase()));
    setPlanetList(newFilter);
  };

  const comparisonFilter = (selected) => {
    selected.forEach((param) => {
      if (param.comparison === 'maior que') {
        const planetsFiltered = dataFetch.results.filter((planets) => (
          +(planets[param.column]) > +(param.number)
        ));
        setplanetsFilterInState(planetsFiltered);
      }
      if (param.comparison === 'menor que') {
        const planetsFiltered = dataFetch.results.filter((planets) => (
          +(planets[param.column]) < +(param.number)
        ));
        setplanetsFilterInState(planetsFiltered);
      }
      if (param.comparison === 'igual a') {
        const planetsFiltered = dataFetch.results.filter((planets) => (
          +(planets[param.column]) === +(param.number)
        ));
        setplanetsFilterInState(planetsFiltered);
      }
    });
    if (selected.length === 0) {
      setplanetsFilterInState(dataFetch.results);
    }
  };

  const filterClasses = (param) => {
    setFilterNumbers({
      ...filterNumbers,
      [param.target.name]: param.target.value,
    });
  };

  const filterSelected = () => {
    if (filterNumbers.comparison === 'maior que') {
      const planetsFiltered = planetsFilterInState.filter((planets) => (
        +(planets[filterNumbers.column]) > +(filterNumbers.number)
      ));
      setplanetsFilterInState(planetsFiltered);
      const newFilters = valuesOptions.filter((param) => param !== filterNumbers.column);
      setValuesOptions(newFilters);
      setselectedFilter([...selectedFilter, filterNumbers]);
      setFilterNumbers({ ...filterNumbers, column: valuesOptions[0] });
    }
    if (filterNumbers.comparison === 'menor que') {
      const planetsFiltered = planetsFilterInState.filter((planets) => (
        +(planets[filterNumbers.column]) < +(filterNumbers.number)
      ));
      setplanetsFilterInState(planetsFiltered);
      const newFilters = valuesOptions.filter((param) => param !== filterNumbers.column);
      setValuesOptions(newFilters);
      setselectedFilter([...selectedFilter, filterNumbers]);
      setFilterNumbers({ ...filterNumbers, column: valuesOptions[0] });
    }
    if (filterNumbers.comparison === 'igual a') {
      const planetsFiltered = planetsFilterInState.filter((planets) => (
        +(planets[filterNumbers.column]) === +(filterNumbers.number)
      ));
      setplanetsFilterInState(planetsFiltered);
      const newFilters = valuesOptions.filter((param) => param !== filterNumbers.column);
      setValuesOptions(newFilters);
      setselectedFilter([...selectedFilter, filterNumbers]);
      setFilterNumbers({ ...filterNumbers, column: valuesOptions[0] });
    }
  };

  const deleteFilter = (idColumn) => {
    const selected = selectedFilter.filter((param) => param.column !== idColumn.column);
    setselectedFilter(selected);
    setValuesOptions([...valuesOptions, idColumn.column]);
    setFilterNumbers({ column: valuesOptions[0], comparison: 'maior que', number: '0' });
    comparisonFilter(selected);
  };

  const removeAllFilter = () => {
    setselectedFilter([]);
    setValuesOptions([
      'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water']);
    setplanetsFilterInState(dataFetch.results);
  };

  const values = useMemo(() => ({
    inLoad,
    makeFetch,
    dataFetch,
    planetList,
    handleChange,
    filterNumbers,
    filterNames,
    filterClasses,
    filterSelected,
    planetsListInFilter,
    planetsFilterInState,
    valuesOptions,
    selectedFilter,
    deleteFilter,
    removeAllFilter,
  }), [
    inLoad,
    dataFetch,
    planetList,
    filterClasses,
    filterNumbers,
    planetsListInFilter,
    planetsFilterInState,
    valuesOptions,
    selectedFilter,
  ]);

  return (
    <Context.Provider value={ values }>
      { children }
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
};

export default Provider;
