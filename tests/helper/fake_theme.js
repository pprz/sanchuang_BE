require('./initial');
const { db } = require('lin-mizar/lin/db');
const { Theme } = require('../../app/models/theme');

const run = async () => {
  await Theme.bulkCreate([
    {
      title: "测试专题",
      description: "测试专题",
      type: 100
    },
    {
      title: "测试专题",
      description: "测试专题",
      type: 100
    },
    {
      title: "测试专题",
      description: "测试专题",
      type: 100
    },
    {
      title: "测试专题",
      description: "测试专题",
      type: 100
    },
    {
      title: "测试专题",
      description: "测试专题",
      type: 100
    },
    {
      title: "测试专题",
      description: "测试专题",
      type: 100
    }
  ]);
  db.close();
};

run();
