const { LinRouter } = require('lin-mizar')
const Router = require('koa-router')
const { Project } = require('../../models/project')
// const { User, Group, Auth } = require("lin-mizar/lin");
const { Favor } = require('../../models/favor')
const { Auth } = require('../../../middlewares/auth')
const {
  PositiveIdValidator
} = require('../../validators/common')
const { FavorDao } = require('../../dao/favor')
const { ProjectNotFound } = require('../../libs/err-code');
// const { ProjectDao } = require('../../dao/project')
// const favorDao=new FavorDao()
const likeApi = new LinRouter({
  prefix: '/like'
})

const like = new Router({
  prefix: '/likeIt'
})

// likeApi.linGet(
//   'userLike',
//   '/',
//   {
//     auth: '点赞',
//     module: '用户',
//     mount: false
//   },
//   loginRequired,
//   async ctx => {
//     let user = ctx.currentUser
//     console.log('user', user)
//   })

like.get('/', new Auth().m, async ctx => {
  const v = await new PositiveIdValidator().validate(ctx)
  const id = v.get('query.id')
  await Project.increment('fav_nums', {
    by: 1,
    where: {
      id
    }
  })
  await Favor.create({
    projectId: id,
    uid: ctx.auth.uid
  })
  ctx.success({
    msg: '点赞成功'
  })
})

like.get('/cancel', new Auth().m, async ctx => {
  const v = await new PositiveIdValidator().validate(ctx)
  const id = v.get('query.id')
  await Favor.destroy({
    where: {
      projectId: id,
      uid: ctx.auth.uid
    }
  })
  await Project.decrement('fav_nums', {
    by: 1,
    where: {
      id
    }
  })
  ctx.success({
    msg: '取消点赞成功'
  })
})

like.get('/favor', new Auth().m, async ctx => {
  const uid = ctx.auth.uid
  ctx.body = await FavorDao.getMyClassicFavors(uid)
})

like.get('/favor/count', new Auth().m, async ctx => {
  console.log('/favor/count', ctx.auth.uid)
  const count = await Favor.count({
    where: {
      uid: ctx.auth.uid
    }
  })
  ctx.body = count + ''
})

like.get('/:id/favor', new Auth().m, async ctx => {
  const v = await new PositiveIdValidator().validate(ctx)
  const id = v.get('path.id')
  const project = await Project.findOne({
    where: {
      id
    }
  })
  if (!project) {
    throw new ProjectNotFound();
  }
  const likePrevious = await FavorDao.userLikeIt(id, ctx.auth.uid)
  ctx.body = {
    fav_nums: project.fav_nums,
    like_status: likePrevious
  }
})

module.exports = { likeApi, like }