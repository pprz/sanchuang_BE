const util = require('util')
const axios = require('axios')
const { config } = require('lin-mizar/lin/config');
const { UserDao } = require('../dao/user')
const { User } = require('../models/user')
const { getTokens, AuthFailed } = require('lin-mizar');
const userDao = new UserDao()
class WXManager {
  static async codeToToken (ctx, code) {
    const url = util.format(config.getItem('wx.loginUrl'),
      config.getItem('wx.appId'),
      config.getItem('wx.appSecret'),
      code)
    const result = await axios.get(url)
    if (result.status !== 200) {
      throw new AuthFailed('openid获取失败')
    }
    const errcode = result.data.errcode
    const errmsg = result.data.errmsg
    if (errcode) {
      throw new AuthFailed('openid获取失败:' + errmsg)
    }
    // openid
    // 档案 user uid openid 长
    // openid

    let user = await userDao.getUserByOpenId(ctx, result.data.openid)
    if (!user) {
      user = await userDao.registerByOpenid(ctx, result.data.openid)
    }

    if (!user.group_id) {
      const group = await userDao.registerGroup()
      console.log('user:', user)
      User.update({
        group_id: group.id
      }, {
        where: {
          nickname: user.nickname
        }
      })
    }
    return getTokens(user)
  }
}

module.exports = {
  WXManager
}