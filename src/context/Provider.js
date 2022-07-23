import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import MyContext from './PlanetContext';
import fetchPlanetAPI from '../services/FetchPlanetsAPI';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState([]);
  const [filterByName, setFilterByName] = useState('');
  const [selectOptions, setSelectOptions] = useState([]);

  // função que chama API, useEffect é responsável por disparar a função quando o componente é renderizado novamente no navegador (componentDidMount).
  useEffect(() => {
    (async () => {
      const { results } = await fetchPlanetAPI();
      // coloca valores em data
      setData(results);
      // coloca valores em search (para que o componente Table possa apresentar os dados) e filtra por nome e por valor numérico (comparação e valor).
      setSearch(results);
    })();
  }, []);

  useEffect(() => {
    // função que filtra os dados por nome de planeta.
    let inputNameFilter = data.filter(({ name }) =>
      name.toLowerCase().includes(filterByName.toLowerCase())
    );
    // condição filtra com os valores das opções selecionadas pelo usuário.
    if (search.length) {
      inputNameFilter = inputNameFilter.filter((item) =>
        selectOptions.every(({ column, comparison, value }) => {
          // every retorna os valores que satisfazem a condição (passa todo array e retorna quando tudo estiver true), se não retorna false.
          if (comparison === "maior que") {
            return Number(item[column]) > Number(value);
          }
          if (comparison === "menor que") {
            return Number(item[column]) < Number(value);
          }
          if (comparison === "igual a") {
            return Number(item[column]) === Number(value);
          }
          return false;
        })
      );
    }
    // seta o valor filtrado em search.
    setSearch(inputNameFilter);
  }, [selectOptions, filterByName, data, search.length]);

  return (
    <MyContext.Provider
      value={ {
        search,
        selectOptions,
        setSelectOptions,
        filterByName,
        setFilterByName,
      } }
    >
      {children}
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
