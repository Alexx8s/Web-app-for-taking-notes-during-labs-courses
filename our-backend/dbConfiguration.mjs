import Sequelize from 'sequelize';
import env from 'dotenv';

env.config();

const db = new Sequelize({
    dialect: "mysql",
    database: "webapp",
    username: "root",
    password: "1234",  
    logging: false,
    define: {
    timestamps: false,
    freezeTableName: true
    }  
})

export default db;