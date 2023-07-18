import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createPokemons, getTypes, getPokemons } from "../../redux/actions/actions";
import Home from "../../assets/Home.png"
import pokebolaAtrapada from "../../assets/pokebolaAtrapada.png"
import style from "./FormPage.module.css"

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
    if (event.target.checked) {
      setInput({
        ...input,
        Tipo: [...input.Tipo, event.target.value],
      });
    }
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    // Validación del campo de nombre
    if (input.Nombre.trim() === "") {
      errors.Nombre = "Ingrese un nombre válido";
      isValid = false;
    } else if (!/^[A-Za-z-]{1,12}$/.test(input.Nombre)) {
      errors.Nombre =
        "El nombre debe tener entre 1 y 12 letras y solo permitir '-'";
      isValid = false;
    } else if (pokemons.some((pokemon) => pokemon.Nombre === input.Nombre)) {
      errors.Nombre = "Ya existe un Pokémon con este nombre";
      isValid = false;
    }

    // Validación del campo de imagen
    if (input.Imagen.trim() === "") {
      errors.Imagen = "Ingrese una URL de imagen válida";
      isValid = false;
    }

    // Validación del campo de vida
    const Vida = parseInt(input.Vida);
    if (isNaN(Vida) || Vida < 1 || Vida > 255) {
      errors.Vida = "La vida debe ser un número entre 1 y 255";
      isValid = false;
    }

    // Validación del campo de ataque
    const Ataque = parseInt(input.Ataque);
    if (isNaN(Ataque) || Ataque < 1 || Ataque > 209) {
      errors.Ataque = "El ataque debe ser un número entre 1 y 209";
      isValid = false;
    }

    // Validación del campo de defensa
    const Defensa = parseInt(input.Defensa);
    if (isNaN(Defensa) || Defensa < 5 || Defensa > 229) {
      errors.Defensa = "La defensa debe ser un número entre 5 y 229";
      isValid = false;
    }

    // Validación del campo de velocidad
    const Velocidad = parseInt(input.Velocidad);
    if (isNaN(Velocidad) || Velocidad < 5 || Velocidad > 199) {
      errors.Velocidad = "La velocidad debe ser un número entre 5 y 199";
      isValid = false;
    }

    // Validación del campo de altura
    const Altura = parseFloat(input.Altura);
    if (isNaN(Altura) || Altura < 0.1 || Altura > 20.0) {
      errors.Altura = "La altura debe ser un número entre 0.1 y 20.0";
      isValid = false;
    }

    // Validación del campo de peso
    const Peso = parseFloat(input.Peso);
    if (isNaN(Peso) || Peso < 0.1 || Peso > 1000.0) {
      errors.Peso = "El peso debe ser un número entre 0.1 y 1000.0";
      isValid = false;
    }

    // Validación de tipos de Pokémon
    if (input.Tipo.length === 0 || input.Tipo.length > 2) {
      errors.Tipo = "Debe seleccionar de 1 a 2 tipos de Pokémon";
      isValid = false;
    }

    // Validación de campos vacíos
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
        <button><img src={Home} alt="Home" className={style.buttonHome}/>Home</button>
      </Link>
      <div className={style.containerCreate}>
      <h1 className={style.titule}>Crea tu Pokémon</h1>
      <form onSubmit={handleSubmit} className={style.form}>
        <div className={style.div}>
        <div className={style.param}>
          <label className={style.form}>Nombre: </label>
          <input
            type="text"
            value={input.Nombre}
            name="Nombre"
            onChange={handleChange}
          />
          <p className={style.validate}> No puede contener más de 12 letras y solo se puede usar el "-"</p>
          {errors.Nombre && <span className={style.alert}>{errors.Nombre}</span>}
        </div>
        <div className={style.param}>
          <label className={style.form}>Imagen: </label>
          <input
            type="text"
            value={input.Imagen}
            name="Imagen"
            onChange={handleChange}
          />
          {errors.Imagen && <span className={style.alert}>{errors.Imagen}</span>}
        </div>
        <div className={style.param}>
          <label className={style.form}>Vida: </label>
          <input
            type="text"
            value={input.Vida}
            name="Vida"
            onChange={handleChange}
          />
          <p className={style.validate}> Tiene que ser un valor entre 1 y 255</p>
          {errors.Vida && <span className={style.alert}>{errors.Vida}</span>}
        </div>
        <div className={style.param}>
          <label className={style.form}>Ataque: </label>
          <input
            type="text"
            value={input.Ataque}
            name="Ataque"
            onChange={handleChange}
          />
          <p className={style.validate}> Tiene que ser un valor entre 1 y 209</p>
          {errors.Ataque && <span className={style.alert}>{errors.Ataque}</span>}
        </div>
        <div className={style.param}>
          <label className={style.form}>Defensa: </label>
          <input
            type="text"
            value={input.Defensa}
            name="Defensa"
            onChange={handleChange}
          />
          <p className={style.validate}> Tiene que ser un valor entre 5 y 229</p>
          {errors.Defensa && <span className={style.alert}>{errors.Defensa}</span>}
        </div>
        <div className={style.param}>
          <label className={style.form}>Velocidad: </label>
          <input
            type="text"
            value={input.Velocidad}
            name="Velocidad"
            onChange={handleChange}
          />
          <p className={style.validate}> Tiene que ser un valor entre 5 y 199</p>
          {errors.Velocidad && <span className={style.alert}>{errors.Velocidad}</span>}
        </div>
        <div className={style.param}>
          <label className={style.form}>Altura: </label>
          <input
            type="text"
            value={input.Altura}
            name="Altura"
            onChange={handleChange}
          />
          <p className={style.validate}> Tiene que ser un valor entre 0.1 y 20.0</p>
          {errors.Altura && <span className={style.alert}>{errors.Altura}</span>}
        </div>
        <div className={style.param}>
          <label className={style.form}>Peso: </label>
          <input
            type="text"
            value={input.Peso}
            name="Peso"
            onChange={handleChange}
          />
          <p className={style.validate}> Tiene que ser un valor entre 0.1 y 1000.0</p>
          {errors.Peso && <span className={style.alert}>{errors.Peso}</span>}
        </div>
        </div>
        <div>
          <div className={style.typeLabel}>
          <label className={style.titleLabelType}>Tipos: </label>
          <p className={style.validateType}> Solo puede agregar hasta 2 tipos</p>
          </div>
          <div className={style.ConteinerCheckboxType}> 
          {types.map((tipo) => (
            <label className={style.labelType} key={tipo.Nombre}>
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
          {errors.Tipo && <span className={style.alertType}>{errors.Tipo}</span>}
        </div>
        <div className={style.divPokeball}>
        <button type="submit"><img src={pokebolaAtrapada} alt="pokebolaAtrapada" className={style.buttonCreate}/>Crear Pokémon</button>
        </div>
      </form>
      </div>
      <div className={style.espacio}>
      </div>
    </div>
  );
};

export default FormPage;