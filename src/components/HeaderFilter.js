import React, { useContext, useState, useEffect } from "react";
import PlanetContext from "../context/PlanetContext";

function HeaderFilter() {
  const [filterByName, setFilterByName] = useState("");
  const [filterColumn, setFilterColumn] = useState("population");
  const [filterComparison, setFilterComparison] = useState("maior que");
  const [filterValue, setFilterValue] = useState(0);
  const { filteredData, filteredColumn } = useContext(PlanetContext);

  useEffect(() => {
    filteredData(filterByName);
  }, [filterByName]);

  useEffect(() => {
    filteredColumn(filterColumn, filterComparison, filterValue);
  }, []);
  
  const handleClick = (e) => {
    e.preventDefault();
    filteredData(filterByName);
    if (filterColumn === "") {
      filteredData(filterByName);
    }
    if (filterColumn !== "" || filterComparison !== "") {
      filteredColumn(filterColumn, filterComparison, filterValue);
    }
  };

  return (
    <div>
      <div className="header-filter">
        <input
          type="text"
          value={filterByName}
          data-testid="name-filter"
          onChange={(e) => setFilterByName(e.target.value)}
          placeholder="Search"
        />
      </div>
      <div>
        <select
          data-testid="column-filter"
          value={filterColumn}
          name="column"
          onChange={(e) => setFilterColumn(e.target.value)}
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>

        <select
          data-testid="comparison-filter"
          value={filterComparison}
          onChange={(e) => setFilterComparison(e.target.value)}
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          type="number"
          data-testid="value-filter"
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
        />
        <button type="button" data-testid="button-filter" onClick={handleClick}>
          Filter
        </button>
      </div>
    </div>
  );
}

export default HeaderFilter;
