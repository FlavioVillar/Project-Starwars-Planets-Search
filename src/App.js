import React from 'react';
import './App.css';
import Table from './components/Table';
import Provider from './context/Provider';
import HeaderFilter from './components/HeaderFilter';

function App() {
  return (
    <Provider>
      <HeaderFilter />
      <Table />
    </Provider>
  );
}

export default App;
