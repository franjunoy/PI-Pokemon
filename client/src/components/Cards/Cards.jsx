import { useSelector, useDispatch } from "react-redux";
import Pokemon from "../Pokemon/Pokemon";
import { useEffect, useState } from "react";
import { getPokemons } from "../../redux/actions/actions";


const Cards = () => {
    const pokemons = useSelector((state) => state.pokemons);
    const dispatch = useDispatch();
    const [actualPage, setActualPage] = useState(1);
    const pokemonsPage = 12;
    useEffect(() => {
        if(pokemons.length === 0) {
            dispatch(getPokemons());
        }
    }, [dispatch, pokemons.length])
    const startPage = (actualPage - 1) * pokemonsPage;
    const endPage = startPage + pokemonsPage;
    const currentPokemons = pokemons.slice(startPage, endPage);
  
    // Lógica para cambiar a la página anterior
    const PreviousPage = () => {
      if (actualPage > 1) {
        setActualPage(actualPage - 1);
      }
    };
  
    // Lógica para cambiar a la página siguiente
    const NextPage = () => {
      const totalPages = Math.ceil(pokemons.length / pokemonsPage);
      if (actualPage < totalPages) {
        setActualPage(actualPage + 1);
      }
    }
    return (
      
        <div>
          <Pokemon pokemons={currentPokemons} />
    
          {/* Agrega controles de paginado */}
          <div>
            <button onClick={PreviousPage} disabled={actualPage === 1}>
              Anterior
            </button>
            <button onClick={NextPage} disabled={endPage >= pokemons.length}>
              Siguiente
            </button>
          </div>
        </div>
      );
    };
    
    export default Cards;