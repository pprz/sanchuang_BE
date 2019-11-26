const { NotFound, Forbidden } = require('lin-mizar')
const { Banner } = require('../models/banner')
// const Sequelize = require('sequelize')

class BannerDao {
  async getBanner (id) {
    const banner = await Banner.findOne({
      where: {
        id,
        delete_time: null
      }
    })
    return banner
  }

  async createBanner (v) {
    const banner = await Banner.findOne({
      where: {
        title: v.get('body.title'),
        delete_time: null
      }
    });
    if (banner) {
      throw new Forbidden({
        msg: '轮播已存在'
      });
    }
    const bn = new Banner();
    bn.title = v.get('body.title')
    bn.description = v.get('body.description')
    bn.type = 100
    bn.artId = v.get('body.artId')
    bn.image = v.get('body.image')
    bn.save()
  }

  async updateBanner (v, id) {
    const banner = await Banner.findByPk(id);
    if (!banner) {
      throw new NotFound({
        msg: '没有找到相关书籍'
      });
    }
    banner.title = v.get('body.title');
    banner.description = v.get('body.description')
    banner.type = 100
    banner.artId = v.get('body.artId')
    banner.image = v.get('body.image');
    banner.save();
  }

  async deleteBanner (id) {
    const banner = await Banner.findOne({
      where: {
        id,
        delete_time: null
      }
    });
    if (!banner) {
      throw new NotFound({
        msg: '没有找到相关书籍'
      });
    }
    banner.destroy();
  }
}

module.exports = { BannerDao }