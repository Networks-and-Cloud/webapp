 // const { DataTypes } = require('sequelize');
import sequelize from '../config/dbConfig.js';
import { DataTypes } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
// const sequelize = require('../config/dbConfig');
// const { v4: uuidv4 } = require('uuid');
 import { UUIDV4 } from 'sequelize'; 

//module.exports = (sequelize) => {
    
   export const Submission = sequelize.define('Submission', {
    
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
      allowNull: false,
      //defaultValue: D,
    },
    submissionUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'submission_url',
    },
    assignmentId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'assignment_id',
    },
    submissionDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'submission_date',
    },
    submissionUpdated: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'submission_updated',
    },
  });


