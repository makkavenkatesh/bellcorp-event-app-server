const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Event = sequelize.define("Event", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  organizer: {
    type: DataTypes.STRING,
  },
  location: {
    type: DataTypes.STRING,
  },
  date: {
    type: DataTypes.DATEONLY,
  },
  description: {
    type: DataTypes.TEXT,
  },
  capacity: {
    type: DataTypes.INTEGER,
  },
  category: {
    type: DataTypes.STRING,
  },
});

module.exports = Event;
