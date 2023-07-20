import style from "./OrderFilter.module.css";
import { useDispatch } from "react-redux";
import { filterPokemon, orderPokemons } from "../../redux/actions/actions";
import { useState } from "react";

const OrderFilter = () => {
  const dispatch = useDispatch();
  const [aux, setAux] = useState(false);

  const handleFilter = (event) => {
    dispatch(filterPokemon(event.target.value));
  };

  const handleOrder = (event) => {
    dispatch(orderPokemons(event.target.value));
    setAux(!aux);
  };

  return (
    <div className={style.conteiner}>
      <select onChange={handleOrder} className={style.option}>
        <option value="Id">Por Id</option>
        <option value="AscendingAZ">Ascendente A-Z</option>
        <option value="DescendingZA">Descendente Z-A</option>
        <option value="AscendingAttack">Menor Ataque</option>
        <option value="DescendingAttack">Mayor Ataque</option>
      </select>
      <div className={style.conteinerLabel}>
        <label htmlFor="allPokemons" className={style.label}>
          {" "}
          All Pokemons
          <input
            type="radio"
            name="filter"
            id="allPokemons"
            value="All Pokemons"
            onChange={handleFilter}
          />
        </label>
        <label htmlFor="api" className={style.label}>
          {" "}
          Api
          <input
            type="radio"
            name="filter"
            id="api"
            value="Api"
            onChange={handleFilter}
          />
        </label>
        <label htmlFor="baseDeDatos" className={style.label}>
          {" "}
          Base de Datos
          <input
            type="radio"
            name="filter"
            id="baseDeDatos"
            value="Base de Datos"
            onChange={handleFilter}
          />
        </label>
      </div>
    </div>
  );
};

export default OrderFilter;
