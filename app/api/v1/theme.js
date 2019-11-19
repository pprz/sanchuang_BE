const { LinRouter } = require('lin-mizar')
const { Theme } = require('../../models/theme')
const { Project } = require('../../models/project')
const { getSafeParamId } = require("../../libs/util")
const { Op } = require('sequelize');
const themeApi = new LinRouter({
  prefix: '/theme'
})

themeApi.get('/', async ctx => {
  const themes = await Theme.findAll({
    where: {
      id: {
        [Op.in]: [1, 2, 3, 4, 5, 6, 7]
      }
    }
  })
  ctx.json(themes)
})

themeApi.get('/:id', async ctx => {
  const id = getSafeParamId(ctx)
  const projects = await Project.findAll({
    where: {
      themeId: id
    }
  })
  ctx.json(projects)
})

module.exports = { themeApi }