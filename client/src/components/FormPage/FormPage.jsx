import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createPokemons, getTypes, getPokemons } from "../../redux/actions/actions";
import Home from "../../assets/Home.png";
import pokebolaAtrapada from "../../assets/pokebolaAtrapada.png";
import style from "./FormPage.module.css";

const FormPage = () => {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);
  const pokemons = useSelector((state) => state.pokemons);
  const [input, setInput] = useState({
    Nombre: "",
    Imagen: "",
    Vida: "",
    Ataque: "",
    Defensa: "",
    Velocidad: "",
    Altura: "",
    Peso: "",
    Tipo: [],
  });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  };

  const handleCheck = (event) => {
    const { name, checked } = event.target;
    if (checked) {
      if (!input.Tipo.includes(name)) {
        setInput({
          ...input,
          Tipo: [...input.Tipo, name],
        });
      }
    } else {
      setInput({
        ...input,
        Tipo: input.Tipo.filter((tipo) => tipo !== name),
      });
    }
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (input.Nombre.trim() === "") {
      errors.Nombre = "Ingrese un nombre válido";
      isValid = false;
    } else if (!/^[A-Za-z-]{1,12}$/.test(input.Nombre)) {
      errors.Nombre =
        "El nombre no puede tener mas de 12 letras, ni numeros y solo permite '-'";
      isValid = false;
    } else if (pokemons.some((pokemon) => pokemon.Nombre === input.Nombre)) {
      errors.Nombre = "Ya existe un Pokémon con este nombre";
      isValid = false;
    }

    if (input.Imagen.trim() === "") {
      errors.Imagen = "Ingrese una URL de imagen válida";
      isValid = false;
    }

    const Vida = parseInt(input.Vida);
    if (isNaN(Vida) || Vida < 1 || Vida > 255) {
      errors.Vida = "La vida debe ser un número entre 1 y 255";
      isValid = false;
    }

    const Ataque = parseInt(input.Ataque);
    if (isNaN(Ataque) || Ataque < 1 || Ataque > 209) {
      errors.Ataque = "El ataque debe ser un número entre 1 y 209";
      isValid = false;
    }

    const Defensa = parseInt(input.Defensa);
    if (isNaN(Defensa) || Defensa < 5 || Defensa > 229) {
      errors.Defensa = "La defensa debe ser un número entre 5 y 229";
      isValid = false;
    }

    const Velocidad = parseInt(input.Velocidad);
    if (isNaN(Velocidad) || Velocidad < 5 || Velocidad > 199) {
      errors.Velocidad = "La velocidad debe ser un número entre 5 y 199";
      isValid = false;
    }

    const Altura = parseFloat(input.Altura);
    if (isNaN(Altura) || Altura < 0.1 || Altura > 20.0) {
      errors.Altura = "La altura debe ser un número entre 0.1 y 20.0";
      isValid = false;
    }

    const Peso = parseFloat(input.Peso);
    if (isNaN(Peso) || Peso < 0.1 || Peso > 1000.0) {
      errors.Peso = "El peso debe ser un número entre 0.1 y 1000.0";
      isValid = false;
    }

    if (input.Tipo.length === 0 || input.Tipo.length > 2) {
      errors.Tipo = "Debe seleccionar de 1 a 2 tipos de Pokémon";
      isValid = false;
    }

    for (const field in input) {
      if (typeof input[field] === "string" && input[field].trim() === "") {
        errors[field] = "Este campo es obligatorio";
        isValid = false;
      }
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateForm()) {
      dispatch(
        createPokemons({
          Nombre: input.Nombre,
          Imagen: input.Imagen,
          Vida: parseInt(input.Vida),
          Ataque: parseInt(input.Ataque),
          Defensa: parseInt(input.Defensa),
          Velocidad: parseInt(input.Velocidad),
          Altura: parseFloat(input.Altura),
          Peso: parseFloat(input.Peso),
          Tipo: input.Tipo.map((nombre) => ({ Nombre: nombre })),
        })
      );
      alert("Creaste tu Pokémon");
      setInput({
        Nombre: "",
        Imagen: "",
        Vida: "",
        Ataque: "",
        Defensa: "",
        Velocidad: "",
        Altura: "",
        Peso: "",
        Tipo: [],
      });
      setErrors({});
    } else {
      alert("Formulario inválido. Por favor, corrija los errores.");
    }
  };

  useEffect(() => {
    dispatch(getTypes());
    dispatch(getPokemons());
  }, [dispatch]);

  return (
    <div className={style.container}>
      <Link to="/home">
        <button className={style.buttonHome}>
          <img className={style.imageHome} src={Home} alt="Home" /> Home
        </button>
      </Link>
      <div className={style.formWrapper}>
        <h1>Crea tu Pokémon</h1>
        <form onSubmit={handleSubmit}>
          <div className={`${style.formGroup} ${style.nameAndLifeDiv}`}>
            <label>Nombre:</label>
            <input
              type="text"
              value={input.Nombre}
              name="Nombre"
              onChange={handleChange}
            />
            <p>El nombre no puede tener mas de 12 letras, ni numeros y solo permite '-'</p>
            {errors.Nombre && <span>{errors.Nombre}</span>}
          </div>
          <div className={`${style.formGroup} ${style.imageDiv}`}>
            <label>Imagen:</label>
            <input
              type="text"
              value={input.Imagen}
              name="Imagen"
              onChange={handleChange}
            />
            {errors.Imagen && <span>{errors.Imagen}</span>}
          </div>
          <div className={style.formGroup}>
            <label>Vida:</label>
            <input
              type="text"
              value={input.Vida}
              name="Vida"
              onChange={handleChange}
            />
            <p>Tiene que ser un valor entre 1 y 255</p>
            {errors.Vida && <span>{errors.Vida}</span>}
          </div>
          <div className={style.formGroup}>
            <label>Ataque:</label>
            <input
              type="text"
              value={input.Ataque}
              name="Ataque"
              onChange={handleChange}
            />
            <p>Tiene que ser un valor entre 1 y 209</p>
            {errors.Ataque && <span>{errors.Ataque}</span>}
          </div>
          <div className={style.formGroup}>
            <label>Defensa:</label>
            <input
              type="text"
              value={input.Defensa}
              name="Defensa"
              onChange={handleChange}
            />
            <p>Tiene que ser un valor entre 5 y 229</p>
            {errors.Defensa && <span>{errors.Defensa}</span>}
          </div>
          <div className={style.formGroup}>
            <label>Velocidad:</label>
            <input
              type="text"
              value={input.Velocidad}
              name="Velocidad"
              onChange={handleChange}
            />
            <p>Tiene que ser un valor entre 5 y 199</p>
            {errors.Velocidad && <span>{errors.Velocidad}</span>}
          </div>
          <div className={style.formGroup}>
            <label>Altura:</label>
            <input
              type="text"
              value={input.Altura}
              name="Altura"
              onChange={handleChange}
            />
            <p>Tiene que ser un valor entre 0.1 y 20.0</p>
            {errors.Altura && <span>{errors.Altura}</span>}
          </div>
          <div className={style.formGroup}>
            <label>Peso:</label>
            <input
              type="text"
              value={input.Peso}
              name="Peso"
              onChange={handleChange}
            />
            <p>Tiene que ser un valor entre 0.1 y 1000.0</p>
            {errors.Peso && <span>{errors.Peso}</span>}
          </div>
          <div className={style.formGroup}>
            <div className={style.tipos}>
              <label>Tipos:</label>
              <p>Solo puede agregar hasta 2 tipos</p>
            </div>
            <div className={style.tipos}>
              {types.map((tipo) => (
                <label key={tipo.Nombre}>
                  <input
                    type="checkbox"
                    name={tipo.Nombre}
                    value={tipo.Nombre}
                    onChange={handleCheck}
                  />
                  {tipo.Nombre}
                </label>
              ))}
            </div>
            {errors.Tipo && <span>{errors.Tipo}</span>}
          </div>
          <div className={style.buttonGroup}>
            <button type="submit">
              <img src={pokebolaAtrapada} alt="pokebolaAtrapada" className={style.buttonCreate} />
              Crear Pokémon
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormPage;