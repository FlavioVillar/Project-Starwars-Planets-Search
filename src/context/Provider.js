import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import MyContext from "./PlanetContext";
import fetchPlanetAPI from "../services/FetchPlanetsAPI";

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState([]);

  const getPlanets = async () => {
    const { results } = await fetchPlanetAPI();
    setData(results);
    setSearch(results);
  };

  function filteredData(filterByName) {
    const inputNameFilter = data.filter(({ name }) =>
      name.toLowerCase().includes(filterByName.toLowerCase())
    );
    setSearch(inputNameFilter);
  }

  function filteredColumn(filterColumn, filterComparison, filterValue) {
    const inputColumnFilter = search.filter(
      ({ [filterColumn]: columnValue }) => {
        if (filterComparison === "maior que") {
          return Number(columnValue) > Number(filterValue);
        }
        if (filterComparison === "igual a") {
          return Number(columnValue) === Number(filterValue);
        }
        if (filterComparison === "menor que") {
          return Number(columnValue) < Number(filterValue);
        }
        return false;
      }
    );
    setSearch(inputColumnFilter);
  }

  useEffect(() => {
    getPlanets();
  }, []);

  return (
    <MyContext.Provider
      value={{ data, setData, search, setSearch, filteredData, filteredColumn }}
    >
      {children}
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
