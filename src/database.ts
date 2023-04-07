import { Sequelize } from "sequelize";
import config from "./config";

const {
    DB_USER,
    DB_PASS,
    DB_HOST,
    DB_PORT,
    DB_NAME
} = config;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: DB_HOST,
    port: parseInt(DB_PORT),
    dialect: 'mysql',
    // logging: false
});

export default sequelize;