import React from 'react';
import './App.css';
import Table from './components/Table';
import Provider from './context/Provider';
import Filter from './components/Filter';

function App() {
  return (
    <Provider>
      <h1>STARWARS Planets!</h1>
      <Filter />
      <Table />
    </Provider>
  );
}

export default App;
