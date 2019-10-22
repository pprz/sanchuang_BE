const { InfoCrudMixin } = require("lin-mizar/lin/interface");
const { merge } = require("lodash");
const { Sequelize, Model } = require("sequelize");
const { db } = require("lin-mizar/lin/db");

class Theme extends Model {
  toJSON () {
    let origin = {
      id: this.id,
      title: this.title,
      description: this.description,
      type: this.type,
      create_time: this.createTime
    };
    return origin;
  }
}

Theme.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    description: Sequelize.STRING,

    type: Sequelize.INTEGER,

    image: Sequelize.INTEGER
  },
  merge(
    {
      tableName: 'lin-theme',
      modelName: 'theme',
      sequelize: db
    },
    InfoCrudMixin.options
  )
);

module.exports = { Theme };
