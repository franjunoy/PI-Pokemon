const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (database) => {
  // defino el modelo
  database.define(
    "pokemon",
    {
      ID: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      Nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 12],
        },
      },
      Imagen: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Vida: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 255,
        },
      },
      Ataque: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 5,
          max: 209,
        },
      },
      Defensa: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 5,
          max: 229,
        },
      },
      Velocidad: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          min: 5,
          max: 199,
        },
      },
      Altura: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
        validate: {
          min: 0.1,
          max: 20.0,
        },
      },
      Peso: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
        validate: {
          min: 0.1,
          max: 1000.0,
        },
      },
    },
    {
      timestamps: false,
    }
  );
};
