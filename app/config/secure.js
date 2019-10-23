'use strict';

module.exports = {
  db: {
    database: 'sanchuang',
    host: '49.232.70.71',
    dialect: 'mysql',
    port: 3306,
    username: 'root',
    password: 'cmyhj002',
    logging: console.log,
    timezone: '+08:00'
  },
  wx: {
    appId: 'wx5186c11f0c8e8d0e',
    appSecret: 'a5f107f02635529da1c76f21fb2162f9',
    loginUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
  },
  secret:
    '\x88W\xf09\x91\x07\x98\x89\x87\x96\xa0A\xc68\xf9\xecJJU\x17\xc5V\xbe\x8b\xef\xd7\xd8\xd3\xe6\x95*4'
};
