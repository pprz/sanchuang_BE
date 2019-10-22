require('./initial');
const { db } = require('lin-mizar/lin/db');
// eslint-disable-next-line no-unused-vars
const { User, Group, Auth } = require('lin-mizar/lin');
const { initModels } = require('./init_models');

/**
 * 如果创建失败，请确保你的数据库中没有同名的分组和同名的用户
 */
const run = async () => {
  await initModels();

  // const group = new Group();

  // group.name = '普通分组';
  // group.info = '就是一个分组而已';
  // await group.save();

  // const user = new User();
  // user.nickname = 'pedro';
  // user.password = '123456';
  // await user.save();

  await Auth.create({
    auth: '删除项目',
    module: '项目',
    group_id: 1
  });
  db.close();
};

run();
