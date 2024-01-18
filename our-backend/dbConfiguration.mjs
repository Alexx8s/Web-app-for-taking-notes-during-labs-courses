import Sequelize from 'sequelize';
import env from 'dotenv';

env.config();

const db = new Sequelize({
    dialect: "mysql",
    database: "WEBAPP",
    username: "root",
    password: "",  
    logging: false,
    define: {
    timestamps: false,
    freezeTableName: true
    }  
})

export default db;