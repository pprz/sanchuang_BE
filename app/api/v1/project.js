const { LinRouter, groupRequired } = require('lin-mizar')
const { Project } = require('../../models/project')
const { ProjectDao } = require('../../dao/project')
const { getSafeParamId } = require("../../libs/util")
const { SearchValidator } = require('../../validators/common')
const { NotFound } = require('lin-mizar')
const { ProjectNotFound } = require('../../libs/err-code');
const {
  ProjectSearchValidator,
  CreateOrUpdateProjectValidator
} = require('../../validators/project');
const projectApi = new LinRouter({
  prefix: '/project'
})

const projectDao = new ProjectDao()

projectApi.get('/:id', async ctx => {
  const id = getSafeParamId(ctx)
  const project = await Project.findOne({
    where: {
      id
    }
  })
  ctx.json(project)
})

projectApi.get('/', async ctx => {
  const projects = await projectDao.getProjects();
  console.log('projects', projects)
  if (!projects || projects.length < 1) {
    throw new NotFound({
      msg: '没有找到相关项目'
    });
  }
  ctx.json(projects);
})

projectApi.get('/search/one', async ctx => {
  const v = await new ProjectSearchValidator().validate(ctx);
  const project = await projectDao.getProjectkByKeyword(v.get('query.q'));
  if (!project) {
    throw new ProjectNotFound();
  }
  ctx.json(project);
});

projectApi.post('/', async ctx => {
  const v = await new CreateOrUpdateProjectValidator().validate(ctx);
  await projectDao.createProject(v);
  ctx.success({
    msg: '新建项目成功'
  });
});

projectApi.put('/:id', async ctx => {
  const v = await new CreateOrUpdateProjectValidator().validate(ctx);
  const id = getSafeParamId(ctx);
  await projectDao.updateProject(v, id);
  ctx.success({
    msg: '更新项目成功'
  });
});

projectApi.linDelete(
  "deleteProject",
  "/:id",
  {
    auth: "删除项目", // 权限名
    module: "项目", // 权限模块
    mount: true // 是否挂载权限，为false时，该权限不生效
  },
  groupRequired,
  async ctx => {
    const id = getSafeParamId(ctx);
    await projectDao.deleteProject(id);
    ctx.success({
      msg: "删除项目成功"
    });
  }
);

projectApi.get('/hotList/getAll', async ctx => {
  const projects = await Project.findAll({
    order: [['fav_nums', 'DESC']],
    limit: 25
  })
  ctx.json(projects)
})

projectApi.get('/search/count', async ctx => {
  const v = await new SearchValidator().validate(ctx)
  const result = await projectDao.searchProjects(
    v.get('query.q'), v.get('query.start'), v.get('query.count'))
  ctx.body = result
})

projectApi.get('/hot_keyword', async ctx => {
  ctx.body = {
    'hot': ['理工大学',
      '分子工程'
    ]
  }
  // 搜索次数最多
  // 一部分参考算法，人工编辑
  // Lin-CMS，编辑热门关键字的功能
})
module.exports = { projectApi }