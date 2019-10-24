/* eslint-disable new-cap */
'use strict';

const {
  LinRouter,
  getTokens,
  loginRequired,
  adminRequired,
  refreshTokenRequiredWithUnifyException,
  Failed,
  logger,
  ParameterException
} = require('lin-mizar');
const jwt = require('jsonwebtoken')
const {
  RegisterValidator,
  LoginValidator,
  UpdateInfoValidator,
  ChangePasswordValidator,
  AvatarUpdateValidator,
  NotEmptyValidator
} = require('../../validators/user')
const {
  LoginType
} = require('../../libs/enum')
const {
  UserDao
} = require('../../dao/user')
const {
  WXManager
} = require('../../libs/wx')
const user = new LinRouter({
  prefix: '/cms/user'
});
const { config } = require('lin-mizar/lin/config');
const userDao = new UserDao();

user.linPost(
  'userRegister',
  '/register', {
    auth: '注册',
    module: '用户',
    mount: false
  },
  adminRequired,
  logger('管理员新建了一个用户'),
  async ctx => {
    const v = await new RegisterValidator().validate(ctx);
    await userDao.createUser(ctx, v);
    ctx.success({
      msg: '用户创建成功'
    });
  }
);

user.linPost(
  'userLogin',
  '/login', {
    auth: '登陆',
    module: '用户',
    mount: false
  },
  async ctx => {
    const v = await new LoginValidator().validate(ctx)
    let result = {}
    switch (v.get('body.type')) {
      case LoginType.USER_EMAIL:
        let user = await ctx.manager.userModel.verify(
          v.get('body.nickname'),
          v.get('body.password')
        );
        result = getTokens(user);
        break
      case LoginType.USER_MINI_PROGRAM:
        result = await WXManager.codeToToken(ctx, v.get('body.nickname'))
        break
      default:
        throw new ParameterException('没有相应的处理函数')
    }
    logger("{user.nickname}登录系统")
    ctx.json({
      access_token: result.accessToken,
      refresh_token: result.refreshToken
    });
  }
);

user.linPost(
  'verify',
  '/verify', {
    auth: '验证',
    module: '用户',
    mount: false
  },
  async ctx => {
    const v = await new NotEmptyValidator().validate(ctx)
    const token = v.get('body.token')
    let result = false
    try {
      jwt.verify(token,
        config.getItem("secret"))
      result = !result
    } catch (error) {
      console.log('error', error)
    }
    ctx.body = {
      is_valid: result
    }
  }
);
user.linPut(
  'userUpdate',
  '/', {
    auth: '用户更新信息',
    module: '用户',
    mount: false
  },
  loginRequired,
  async ctx => {
    const v = await new UpdateInfoValidator().validate(ctx);
    await userDao.updateUser(ctx, v);
    ctx.success({
      msg: '操作成功'
    });
  }
);

user.linPut(
  'userUpdatePassword',
  '/change_password', {
    auth: '修改密码',
    module: '用户',
    mount: false
  },
  loginRequired,
  async ctx => {
    const v = await new ChangePasswordValidator().validate(ctx);
    let user = ctx.currentUser;
    const ok = user.changePassword(
      v.get('body.old_password'),
      v.get('body.new_password')
    );
    if (!ok) {
      throw new Failed({
        msg: '修改密码失败，你可能输入了错误的旧密码'
      });
    }
    user.save();
    ctx.success({
      msg: '密码修改成功'
    });
  }
);

user.linGet(
  'userGetToken',
  '/refresh', {
    auth: '刷新令牌',
    module: '用户',
    mount: false
  },
  refreshTokenRequiredWithUnifyException,
  async ctx => {
    let user = ctx.currentUser;
    const {
      accessToken,
      refreshToken
    } = getTokens(user);
    ctx.json({
      access_token: accessToken,
      refresh_token: refreshToken
    });
  }
);

user.linGet(
  'userGetAuths',
  '/auths', {
    auth: '查询自己拥有的权限',
    module: '用户',
    mount: false
  },
  loginRequired,
  async ctx => {
    console.log('111111111111')
    let user = await userDao.getAuths(ctx);
    ctx.json(user);
  }
);

user.linGet(
  'getInformation',
  '/information', {
    auth: '查询自己信息',
    module: '用户',
    mount: false
  },
  loginRequired,
  async ctx => {
    const user = ctx.currentUser;
    ctx.json(user);
  }
);

user.put('/avatar', loginRequired, async ctx => {
  const v = await new AvatarUpdateValidator().validate(ctx);
  const avatar = v.get('body.avatar');
  let user = ctx.currentUser;
  user.avatar = avatar;
  await user.save();
  ctx.success({
    msg: '更新头像成功'
  });
});

module.exports = {
  user
};