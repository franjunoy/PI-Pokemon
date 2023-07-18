import Cards from "../Cards/Cards";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import style from "./HomePage.module.css"
import OrderFilter from "../OrderFilter/OrderFilter"
import huevoPokemon from "../../assets/huevoPokemon.png";

const HomePage = () => {
  return (
    <div className={style.HomePage}>
      <Link to= "/form"> <button className={style.button}><img src={huevoPokemon} alt="huevoPokemon" className={style.image}/><h2 className={style.h2}>CREAR POKEMON</h2></button> </Link>
      <div className={style.SearchBar}><SearchBar/></div>
      <div className={style.OrderFilter}><OrderFilter/></div>
      <div className={style.Cards}><Cards/></div>
    </div>
  );
};

export default HomePage;
