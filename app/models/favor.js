const { InfoCrudMixin } = require("lin-mizar/lin/interface")
const { merge } = require("lodash")
const { Sequelize, Model } = require("sequelize")
const { db } = require("lin-mizar/lin/db")

class Favor extends Model {
  toJSON () {
    let orgin = {
      id: this.id,
      projectId: this.projectId,
      uid: this.uid
    }
    return orgin;
  }
}

Favor.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  projectId: Sequelize.INTEGER,
  uid: Sequelize.INTEGER

},
merge(
  {
    tableName: 'lin_favor',
    modelName: 'favor',
    sequelize: db
  },
  InfoCrudMixin.options
));

module.exports = { Favor };