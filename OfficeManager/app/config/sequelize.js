const dbConfig = require("./db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.office = require("../models/OfficeModel.js")(sequelize, Sequelize);
db.officer = require("../models/OfficerModel.js")(sequelize, Sequelize);
db.user = require("../models/UserModel.js")(sequelize, Sequelize);
db.officer.belongsTo(db.office, { foreignKey: 'office_id' });
db.officer.belongsTo(db.user, { foreignKey: 'user_id' });
db.user.belongsTo(db.office, { foreignKey: 'office_id' });
db.user.belongsTo(db.officer, { foreignKey: 'officer_id' });

module.exports = db;