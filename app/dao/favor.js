const { Favor } = require('../models/favor')
const { NotFound } = require('lin-mizar');
const { Project } = require('../models/project');
const {
  Op
} = require('sequelize')
class FavorDao {
  static async like (projectId, uid) {
    await Favor.create({
      projectId,
      uid
    })
  }

  async getMyClassicFavors (uid) {
    const arts = await Favor.findAll({
      where: {
        uid
      }
    })
    if (!arts) {
      throw new NotFound()
    }
    console.log('projects', arts)
    const ids = []
    for (let temp of arts) {
      ids.push(temp.projectId)
    }
    console.log('ids', ids)
    const projects = await Project.findAll({
      where: {
        id: {
          [Op.in]: ids
        }
      }
    })
    return projects
  }
}

module.exports = { FavorDao }