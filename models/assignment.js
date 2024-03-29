 import sequelize from '../config/dbConfig.js';
 import { DataTypes } from 'sequelize';
// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/dbConfig');
//const {v4 as uuidv4} = require()
import { v4 as uuidv4 } from 'uuid'; // Import the UUID library
//const myUuid = uuidv4();
// console.log(myUuid);

export const Assignment = sequelize.define('Assignment', {
  id: {
    type: DataTypes.UUID, // Define the data type as UUID
    defaultValue: () => uuidv4(), // Set the default value to a generated UUID
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    unique: true,
  },
  points: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 10,
    },
  },
  num_of_attempts: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 3,
    },
  },
  deadline: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  assignment_created: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
  assignment_updated: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
  createdBy: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
