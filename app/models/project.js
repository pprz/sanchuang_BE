const { InfoCrudMixin } = require("lin-mizar/lin/interface");
const { merge } = require("lodash");
const { Sequelize, Model } = require("sequelize");
const { db } = require("lin-mizar/lin/db");

class Project extends Model {
  toJSON () {
    let orgin = {
      id: this.id,
      image: this.image,
      title: this.title,
      leader: this.leader,
      company: this.company,
      mobile: this.mobile,
      assistant: this.assistant,
      assistantMobile: this.assistantMobile,
      attachment: this.attachment,
      summary: this.summary,
      example: this.example,
      themeId: this.themeId,
      type: this.type,
      fav_nums: this.fav_nums
    };
    return orgin;
  }
}

Project.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  image: {
    type: Sequelize.STRING(100)
  },
  title: {
    type: Sequelize.STRING(80),
    allowNull: true
  },
  leader: {
    type: Sequelize.STRING(80),
    allowNull: true
  },
  company: {
    type: Sequelize.STRING(80),
    allowNull: true
  },
  mobile: {
    type: Sequelize.STRING(20),
    allowNull: true
  },
  assistantMobile: {
    type: Sequelize.STRING(20),
    allowNull: true
  },
  assistant: {
    type: Sequelize.STRING(80),
    allowNull: true
  },
  attachment: {
    type: Sequelize.STRING(100),
    allowNull: true
  },
  summary: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  example: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  themeId: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  fav_nums: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  type: Sequelize.INTEGER
},
merge(
  {
    tableName: 'lin_project',
    modelName: 'project',
    sequelize: db
  },
  InfoCrudMixin.options
));

module.exports = { Project };