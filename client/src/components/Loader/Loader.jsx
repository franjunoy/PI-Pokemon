import loading from "../../assets/png-transparent-poke-ball-thumbnail.png";
import style from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={style.loading}>
      <img src={loading} alt="Pokeball" />
    </div>
  );
};

export default Loader;
