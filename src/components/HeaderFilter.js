import React, { useContext, useState } from 'react';
import PlanetContext from '../context/PlanetContext';
import './HeaderFilter.css';

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
    setFilterByNumericValues({
      column: '',
      comparison: '',
      value: '',
    });
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
    <div className="container-header-filter">
      <div className="img-starwars">
        {/* <img src="https://media2.giphy.com/media/l1uguGf2RVIsTXNDO/100.webp?cid=ecf05e47m2n67ic1ss7osaayeue0rliv5gy0yvfix7nrsihz&rid=100.webp&ct=g" alt="Star Wars" /> */}
      </div>
      <div className="container-header-filter-title">
        <input
          type="text"
          value={ filterByName }
          className="input-filter-name"
          data-testid="name-filter"
          // pega valor para filtrar por nome do planeta e seta no state, que está no contexto.
          onChange={ (e) => setFilterByName(e.target.value) }
          placeholder="Search ..."
        />
        <div className="select">
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
        </div>
        <div className="select">
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
        </div>
        <input
          type="number"
          data-testid="value-filter"
          className="input-number"
          value={ filterByNumericValues.value }
          onChange={ ({ target: { value } }) => setFilterByNumericValues(
            (prevState) => ({ ...prevState, value }),
          ) }
        />
        <button
          type="button"
          data-testid="button-filter"
          className="btn-filter"
          onClick={ handleClickFilter }
        >
          Filter
        </button>
        <button
          className="btn-remove-all"
          data-testid="button-remove-filters"
          type="button"
          onClick={ handleClickRemoveAll }
        >
          Remove all filters
        </button>
      </div>
      {selectOptions.map((filter, index) => (
        <div className="text-filter-btnX" data-testid="filter" key={ index }>
          <span>
            {`${filter.column} ${filter.comparison} ${filter.value}`}
          </span>
          <button
            className="btn-filter-remove"
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
    </div>
  );
}

export default HeaderFilter;
