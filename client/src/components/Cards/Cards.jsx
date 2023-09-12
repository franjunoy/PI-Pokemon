import { useSelector, useDispatch } from "react-redux";
import Pokemon from "../Pokemon/Pokemon";
import { useEffect, useState } from "react";
import { getPokemons } from "../../redux/actions/actions";
import style from "./Cards.module.css";
import loading from "../../assets/png-transparent-poke-ball-thumbnail.png"

const Cards = () => {
  const pokemons = useSelector((state) => state.pokemons);
  const dispatch = useDispatch();
  const [actualPage, setActualPage] = useState(1);
  const pokemonsPage = 12;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (pokemons.length === 0) {
      dispatch(getPokemons())
        .then(() => {
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error de busqueda:", error);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [dispatch, pokemons.length]);

  const startPage = (actualPage - 1) * pokemonsPage;
  const endPage = startPage + pokemonsPage;
  const currentPokemons = pokemons.slice(startPage, endPage);

  const PreviousPage = () => {
    if (actualPage > 1) {
      setActualPage(actualPage - 1);
    }
  };

  const NextPage = () => {
    const totalPages = Math.ceil(pokemons.length / pokemonsPage);
    if (actualPage < totalPages) {
      setActualPage(actualPage + 1);
    }
  };
  return (
    <div>
      {isLoading ? (
        <div className={style.loading}>
        <img src={loading} alt="Pokeball" />
        </div>
      ) : (
        <div>
          <Pokemon pokemons={currentPokemons} />
          <div className={style.button}>
            <div className={style.buttonItem}>
              <button onClick={PreviousPage} disabled={actualPage === 1}>
                Anterior
              </button>
            </div>
            <div className={style.buttonItem}>
              <h2>{actualPage}</h2>
            </div>
            <div className={style.buttonItem}>
              {" "}
              <button onClick={NextPage} disabled={endPage >= pokemons.length}>
                Siguiente
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cards;
