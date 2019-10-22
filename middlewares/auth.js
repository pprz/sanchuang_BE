const auth = require('basic-auth')
const jwt = require('jsonwebtoken')
const { Forbbiden } = require('../app/libs/err-code')
const { config } = require('lin-mizar/lin/config')
class Auth {
  constructor (level) {
    this.level = level || 1
    Auth.USER = 8
    Auth.ADMIN = 16
    Auth.SUPER_ADMIN = 32
  }

  get m () {
    return async (ctx, next) => {
      const userToken = auth(ctx.req)
      let errMsg = 'token不合法'

      if (!userToken || !userToken.name) {
        throw new Forbbiden(errMsg)
      }
      try {
        var decode = jwt.verify(userToken.name,
          config.getItem("secret"))
      } catch (error) {
        // eslint-disable-next-line eqeqeq
        if (error.name == 'TokenExpiredError') {
          errMsg = 'token已过期'
        }
        throw new Forbbiden(errMsg)
      }

      if (decode.scope < this.level) {
        errMsg = '权限不足'
        throw new Forbbiden(errMsg)
      }

      // uid,scope
      ctx.auth = {
        uid: decode.identity,
        scope: decode.scope
      }

      await next()
    }
  }

  static verifyToken (token) {
    try {
      jwt.verify(token,
        global.config.security.secretKey)
      return true
    } catch (error) {
      return false
    }
  }
}

module.exports = {
  Auth
}