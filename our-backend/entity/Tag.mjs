import db from '../dbConfiguration.mjs';
import Sequelize from 'sequelize';

const Tag = db.define('Tag', {
  TagID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  TagName: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
});


export default Tag;