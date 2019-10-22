const { LinRouter } = require('lin-mizar')
const { Banner } = require('../../models/banner')
const bannerApi = new LinRouter({
  prefix: '/banner'
})

bannerApi.get('/', async ctx => {
  const banners = await Banner.findAll({
    where: {
      delete_time: null
    }
  })
  ctx.json(banners)
})

module.exports = { bannerApi }