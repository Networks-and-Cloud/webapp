import { Sequelize} from 'sequelize';
import 'dotenv/config'
export const sequelize = new Sequelize({
  dialect: process.env.DB_DIALECT,//'mysql', // Change this to your desired database dialect (e.g., postgres, sqlite)
  host: process.env.MYSQL_HOST,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  port:process.env.MYSQL_PORT
});

//export {DataTypes};


export default sequelize;


//seqdb