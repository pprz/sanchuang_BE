const { LinRouter, NotFound, groupRequired, disableLoading } = require('lin-mizar')
const { Banner } = require('../../models/banner')
const { BannerDao } = require('../../dao/banner')
const { getSafeParamId } = require("../../libs/util")
const { CreateOrUpdateBannerValidator } = require("../../validators/banner")
const bannerApi = new LinRouter({
  prefix: '/banner'
})
const bannerDto = new BannerDao()
bannerApi.get('/', async ctx => {
  const banners = await Banner.findAll({
    where: {
      delete_time: null
    }
  })
  ctx.json(banners)
})

bannerApi.get('/:id', async ctx => {
  const id = getSafeParamId(ctx)
  const banner = await bannerDto.getBanner(id)
  if (!banner) {
    throw new NotFound({
      msg: '没有找到相关书籍'
    });
  }
  ctx.json(banner)
})

bannerApi.post('/', async ctx => {
  const v = await new CreateOrUpdateBannerValidator().validate(ctx)
  await bannerDto.createBanner(v)
  ctx.success({
    msg: '新建轮播成功'
  });
});

bannerApi.put('/:id', async ctx => {
  const v = await new CreateOrUpdateBannerValidator().validate(ctx)
  const id = getSafeParamId(ctx);
  await bannerDto.updateBanner(v, id);
  ctx.success({
    msg: '更新轮播成功'
  });
});

bannerApi.linDelete(
  "deleteBanner",
  "/:id",
  {
    auth: "删除轮播", // 权限名
    module: "项目", // 权限模块
    mount: true // 是否挂载权限，为false时，该权限不生效
  },
  groupRequired,
  async ctx => {
    const id = getSafeParamId(ctx);
    await bannerDto.deleteBanner(id);
    ctx.success({
      msg: "删除轮播成功"
    });
  }
)

module.exports = { bannerApi, [disableLoading]: false }