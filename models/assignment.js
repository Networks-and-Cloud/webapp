import sequelize from '../config/dbConfig.js';
import { DataTypes } from 'sequelize';

export const Assignment = sequelize.define('Assignment', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
    
      notEmpty: true,
    },
    unique:true
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
      max:3
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
        }
});

