const { InfoCrudMixin } = require('lin-mizar/lin/interface');
// eslint-disable-next-line semi
const { merge } = require('lodash');
const { Sequelize, Model } = require('sequelize');
const { db } = require('lin-mizar/lin/db');

class Banner extends Model {
  toJSON () {
    let origin = {
      id: this.id,
      title: this.title,
      artId: this.artId,
      description: this.description,
      image: this.image,
      type: this.type,
      create_time: this.createTime
    };
    return origin;
  }
}

Banner.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: Sequelize.STRING(50),
    description: Sequelize.STRING,
    type: Sequelize.INTEGER,
    artId: Sequelize.INTEGER,
    image: {
      type: Sequelize.STRING(100),
      allowNull: true
    }
  },
  merge(
    {
      tableName: 'lin-banner',
      modelName: 'banner',
      sequelize: db
    },
    InfoCrudMixin.options
  )
);

module.exports = { Banner };
