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

  static async userLikeIt (art_id, uid) {
    const favor = await Favor.findOne({
      where: {
        uid,
        projectId: art_id
      }
    })
    // eslint-disable-next-line no-unneeded-ternary
    return favor ? true : false
  }

  static async getMyClassicFavors (uid) {
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