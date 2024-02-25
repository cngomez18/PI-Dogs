
const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelos
  sequelize.define('dog_temperament', {
    
    dogId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    temperamentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
   
})};