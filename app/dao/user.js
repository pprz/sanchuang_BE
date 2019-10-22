/* eslint-disable new-cap */
'use strict';

const {
  RepeatException,
  ParametersException
} = require('lin-mizar');
const {
  set,
  has
} = require('lodash');
const { Group, Auth } = require("lin-mizar/lin");

class UserDao {
  async createUser (ctx, v) {
    let user = await ctx.manager.userModel.findOne({
      where: {
        username: v.get('body.username')
      }
    });
    if (user) {
      throw new RepeatException({
        msg: '用户名重复，请重新输入'
      });
    }
    if (v.get('body.email') && v.get('body.email').trim() !== '') {
      user = await ctx.manager.userModel.findOne({
        where: {
          email: v.get('body.email')
        }
      });
      if (user) {
        throw new RepeatException({
          msg: '注册邮箱重复，请重新输入'
        });
      }
    }
    this.registerUser(ctx, v);
  }

  async updateUser (ctx, v) {
    let user = ctx.currentUser;
    if (v.get('body.email') && user.email !== v.get('body.email')) {
      const exit = await ctx.manager.userModel.findOne({
        where: {
          email: v.get('body.email')
        }
      });
      if (exit) {
        throw new ParametersException({
          msg: '邮箱已被注册，请重新输入邮箱'
        });
      }
      user.email = v.get('body.email');
    }
    if (v.get('body.nickname')) {
      user.nickname = v.get('body.nickname')
    }
    user.save();
  }

  async getAuths (ctx) {
    let user = ctx.currentUser;
    let auths = await ctx.manager.authModel.findAll({
      where: {
        group_id: user.group_id
      }
    });
    let group = await ctx.manager.groupModel.findOne({
      where: {
        id: user.group_id
      }
    })
    const aus = this.splitAuths(auths);
    set(user, 'auths', aus);
    if (group) {
      set(user, 'groupName', group.name);
    }
    return user;
  }

  splitAuths (auths) {
    let tmp = {};
    auths.forEach(au => {
      if (!has(tmp, au['module'])) {
        tmp[au['module']] = [{
          module: au['module'],
          auth: au['auth']
        }];
      } else {
        tmp[au['module']].push({
          module: au['module'],
          auth: au['auth']
        });
      }
    });
    const aus = Object.keys(tmp).map(key => {
      let tm1 = Object.create(null);
      set(tm1, key, tmp[key]);
      return tm1;
    });
    return aus;
  }

  registerUser (ctx, v) {
    const user = new ctx.manager.userModel();
    user.username = v.get('body.username');
    user.password = v.get('body.password');
    user.group_id = v.get('body.group_id');
    if (v.get('body.email') && v.get('body.email').trim() !== '') {
      user.email = v.get('body.email');
    }
    user.save();
  }

  async getUserByOpenId (ctx, openid) {
    const user = await ctx.manager.userModel.findOne({
      where: {
        openid
      }
    })
    return user
  }

  async registerByOpenid (ctx, openid) {
    const result = await ctx.manager.userModel.create({
      nickname: '',
      openid,
      password: ''
    })
    return result
  }
  async registerGroup () {
    const group = new Group()
    group.name = "普通用户"
    group.info = "供微信用户登录"
    await group.save()
    await Auth.create({
      auth: "点赞",
      model: "项目",
      group_id: group.id
    })
    return group
  }
}

module.exports = {
  UserDao
};