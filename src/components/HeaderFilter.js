import React, { useContext, useState } from 'react';
import PlanetContext from '../context/PlanetContext';

function HeaderFilter() {
  const [columns, setColumns] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  // valores definidos no state inicial para passar no teste.
  const [filterByNumericValues, setFilterByNumericValues] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });

  const {
    selectOptions,
    setSelectOptions,
    filterByName,
    setFilterByName } = useContext(PlanetContext);

  // Ação que pega os valores das colunas, comparação e valor e armazena em selectOptions, que está no contexto, e usa na função useEffect de filtro.
  // Para que o componente Table possa filtrar os dados.
  // Essa função é executada quando o usuário seleciona uma opção.
  const handleClickFilter = () => {
    setColumns((prevState) => prevState
      .filter((item) => item !== filterByNumericValues.column));
    setSelectOptions((prevState) => [...prevState, filterByNumericValues]);
  };

  const handleClickRemoveAll = () => {
    setSelectOptions([]);
    setColumns([
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ]);
  };

  return (
    <div>
      <div className="header-filter">
        <input
          type="text"
          value={ filterByName }
          data-testid="name-filter"
          // pega valor para filtrar por nome do planeta e seta no state, que está no contexto.
          onChange={ (e) => setFilterByName(e.target.value) }
          placeholder="Search"
        />
      </div>
      <div>
        <select
          data-testid="column-filter"
          value={ filterByNumericValues.column }
          name="column"
          onChange={ ({ target: { value } }) => setFilterByNumericValues(
            (prevState) => ({ ...prevState, column: value }),
          ) }
        >
          {columns.map((column, index) => (
            <option key={ index } value={ column }>
              {column}
            </option>
          ))}
        </select>

        <select
          data-testid="comparison-filter"
          value={ filterByNumericValues.comparison }
          onChange={ ({ target: { value } }) => setFilterByNumericValues(
            (prevState) => ({ ...prevState, comparison: value }),
          ) }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          type="number"
          data-testid="value-filter"
          value={ filterByNumericValues.value }
          onChange={ ({ target: { value } }) => setFilterByNumericValues(
            (prevState) => ({ ...prevState, value }),
          ) }
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ handleClickFilter }
        >
          Filter
        </button>
      </div>
      {selectOptions.map((filter, index) => (
        <div data-testid="filter" key={ index }>
          <span>
            {`${filter.column} ${filter.comparison} ${filter.value}`}
          </span>
          <button
            id={ index }
            type="button"
            onClick={ () => {
              setSelectOptions((prevState) => prevState
                .filter((item) => item.column !== filter.column));
              setColumns((prevState) => [...prevState, filter.column]);
            } }
            // função de onclick só funcionou direto no button, não em uma função para ser chamada.
          >
            X
          </button>
        </div>
      ))}
      <button
        data-testid="button-remove-filters"
        type="button"
        onClick={ handleClickRemoveAll }
      >
        Remove all filters
      </button>
    </div>
  );
}

export default HeaderFilter;
