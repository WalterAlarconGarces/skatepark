const Sequelize = require("sequelize");
const db = require("../config/db")

const Users = db.define("skaters",{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: Sequelize.STRING(50),
        allowNull: false,
    },
    nombre:{
        type: Sequelize.STRING(25),
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING(25),
        allowNull: false,
    },
    anos_experiencia: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    especialidad: {
        type: Sequelize.STRING(50),
        allowNull: false,
    },
    foto: {
        type: Sequelize.STRING(255),
        allowNull: false,
    },
    estado: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
    }
},{
    timestamps: false
  })

module.exports = Users;