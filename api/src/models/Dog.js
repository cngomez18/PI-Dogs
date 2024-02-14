const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    ID:{
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    image:{
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    weight:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    lifespan:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};
