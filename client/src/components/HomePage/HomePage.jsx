import Cards from "../Cards/Cards";
import SearchBar from "../SearchBar/SearchBar";
import style from "./HomePage.module.css";
import OrderFilter from "../OrderFilter/OrderFilter";


const HomePage = () => {
  return (
    <div className={style.HomePage}>
      <div className={style.SearchBar}>
        <SearchBar />
      </div>
      <div className={style.OrderFilter}>
        <OrderFilter />
      </div>
      <div className={style.Cards}>
        <Cards />
      </div>
    </div>
  );
};

export default HomePage;
