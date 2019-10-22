require('./initial');
const { db } = require('lin-mizar/lin/db');
const { Banner } = require('../../app/models/banner');

const run = async () => {
  await Banner.bulkCreate([
    {
      title: "深入理解计算机系统",
      artId: 1,
      description: "从程序员的视角，看计算机系统",
      image: "https://img3.doubanio.com/lpic/s1470003.jpg",
      type: 100
    },
    {
      title: "深入理解计算机系统",
      artId: 1,
      description: "从程序员的视角，看计算机系统",
      image: "https://img3.doubanio.com/lpic/s1470003.jpg",
      type: 200
    },
    {
      title: "深入理解计算机系统",
      artId: 1,
      description: "从程序员的视角，看计算机系统",
      image: "https://img3.doubanio.com/lpic/s1470003.jpg",
      type: 300
    }
  ]);
  db.close();
};

run();
