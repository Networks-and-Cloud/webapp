

import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import { parseCSV } from "../Scripts/UserScripts.js";
import { Assignment } from "../models/assignment.js";
import { where } from "sequelize";


export const bootstrap = async () => {
  await User.sync();
  await Assignment.sync();
  try {
    parseCSV(async (data) => {
    
      for (const row of data) {
        try {
        
          const existingUser = await User.findOne({
            where: { email: row.email },
          });

          if (!existingUser) {
            // If user does not exist, create a new user
            const hashedPassword = await bcrypt.hash(row.password, 10);
            await User.create({
              first_name: row.first_name,
              last_name: row.last_name,
              email: row.email,
              password: hashedPassword,
            });
            console.log(`User has been created for email: ${row.email}`);
          } else {
            // If user already exists, no action is required
            console.log(`The user with email ${row.email} already exists`);
          }
        } catch (error) {
          console.error(`There is ann error creating user for email ${row.email}:`, error);
        }
      }
    });
  } catch (err) {
    throw new Error(err.message);
  }
};

export const findUserbyUsername = async (username) => {
  const email = username;
  let user = await User.findOne({ where: { email } });
  console.log(user);
  return user;
};

