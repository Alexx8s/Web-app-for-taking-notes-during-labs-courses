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
},
  {
    tablename: "Tags",
    timestamps: false
});
db.sync()
    .then(() => console.log('Task table has been successfully created, if one doesn\'t exist'))
    .catch(error => console.log('This error occured', error));

export default Tag;