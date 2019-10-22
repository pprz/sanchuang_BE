const { NotFound, Forbidden } = require('lin-mizar');
const { Project } = require('../models/project');
const Sequelize = require('sequelize');

class ProjectDao {
  async searchProjects (q, start, count, summary = 1) {
    const projects = await Project.findAndCountAll({
      where: {
        title: {
          [Sequelize.Op.like]: `%${q}%`
        },
        delete_time: null
      },
      offset: start,
      limit: count
    })
    return projects
  }

  async getProject (id) {
    const project = await Project.findOne({
      where: {
        id,
        delete_time: null
      }
    });
    return project
  }

  async getProjectkByKeyword (q) {
    const project = await Project.findOne({
      where: {
        title: {
          [Sequelize.Op.like]: `%${q}%`
        },
        delete_time: null
      }
    });
    return project
  }

  async getProjects () {
    const projects = await Project.findAll({
      where: {
        delete_time: null
      }
    });
    return projects
  }

  async updateProject (v, id) {
    const pt = await Project.findByPk(id);
    if (!pt) {
      throw new NotFound({
        msg: '没有找到相关书籍'
      });
    }
    pt.image = v.get('body.image')
    pt.title = v.get('body.title')
    pt.leader = v.get('body.leader')
    pt.company = v.get('body.company')
    pt.assistant = v.get('body.assistant')
    pt.assistantMobile = v.get('body.assistantMobile')
    pt.attachment = v.get('body.attachment')
    pt.summary = v.get('body.summary')
    pt.example = v.get('body.example')
    pt.themeId = v.get('body.themeId')
    pt.save()
  }

  async deleteProject (id) {
    const project = await Project.findOne({
      where: {
        id,
        delete_time: null
      }
    });
    if (!project) {
      throw new NotFound({
        msg: '没有找到相关书籍'
      });
    }
    project.destroy();
  }

  async createProject (v) {
    const project = await Project.findOne({
      where: {
        title: v.get('body.title'),
        delete_time: null
      }
    });
    if (project) {
      throw new Forbidden({
        msg: '项目已存在'
      });
    }
    const pt = new Project();
    pt.image = v.get('body.image')
    pt.title = v.get('body.title')
    pt.leader = v.get('body.leader')
    pt.company = v.get('body.company')
    pt.mobile = v.get('body.mobile')
    pt.assistant = v.get('body.assistant')
    pt.assistantMobile = v.get('body.assistantMobile')
    pt.attachment = v.get('body.attachment')
    pt.summary = v.get('body.summary')
    pt.example = v.get('body.example')
    pt.themeId = v.get('body.themeId')
    pt.type = 100
    pt.save()
  }
}

module.exports = { ProjectDao }