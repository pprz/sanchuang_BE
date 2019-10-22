require("./initial");
const { db } = require("lin-mizar/lin/db");
const { Project } = require("../../app/models/project");

const run = async () => {
  await Project.bulkCreate([
    {
      image: "https://img3.doubanio.com/lpic/s1106934.jpg",
      name: "分子催化实验室科研工作简介",
      leader: "郭洪辰",
      company: "大连理工大学",
      mobile: "12542677865",
      assistant: "小张",
      assistantMobile: "12542677865",
      attachment: "https://img3.doubanio.com/lpic/s1106934.jpg",
      summary: "从程序员的视角，看计算机系统！\n本书适用于那些想要写出更快、更可靠程序的程序员。通过掌握程序是如何映射到系统上，以及程序是如何执行的，读者能够更好的理解程序的行为为什么是这样的，以及效率低下是如何造成的。",
      example: "硅酸盐分子产品筛查",
      themeId: "1",
      fav_nums: 51,
      type: 100
    },
    {
      image: "https://img3.doubanio.com/lpic/s1106934.jpg",
      name: "分子催化实验室科研工作简介",
      leader: "郭洪辰",
      company: "大连理工大学",
      mobile: "12542677865",
      assistant: "小张",
      assistantMobile: "12542677865",
      attachment: "https://img3.doubanio.com/lpic/s1106934.jpg",
      summary: "从程序员的视角，看计算机系统！\n本书适用于那些想要写出更快、更可靠程序的程序员。通过掌握程序是如何映射到系统上，以及程序是如何执行的，读者能够更好的理解程序的行为为什么是这样的，以及效率低下是如何造成的。",
      example: "硅酸盐分子产品筛查",
      themeId: "1",
      fav_nums: 51,
      type: 100
    }, {
      image: "https://img3.doubanio.com/lpic/s1106934.jpg",
      name: "分子催化实验室科研工作简介",
      leader: "郭洪辰",
      company: "大连理工大学",
      mobile: "12542677865",
      assistant: "小张",
      assistantMobile: "12542677865",
      attachment: "https://img3.doubanio.com/lpic/s1106934.jpg",
      summary: "从程序员的视角，看计算机系统！\n本书适用于那些想要写出更快、更可靠程序的程序员。通过掌握程序是如何映射到系统上，以及程序是如何执行的，读者能够更好的理解程序的行为为什么是这样的，以及效率低下是如何造成的。",
      example: "硅酸盐分子产品筛查",
      themeId: "1",
      fav_nums: 51,
      type: 100
    }, {
      image: "https://img3.doubanio.com/lpic/s1106934.jpg",
      name: "分子催化实验室科研工作简介",
      leader: "郭洪辰",
      company: "大连理工大学",
      mobile: "12542677865",
      assistant: "小张",
      assistantMobile: "12542677865",
      attachment: "https://img3.doubanio.com/lpic/s1106934.jpg",
      summary: "从程序员的视角，看计算机系统！\n本书适用于那些想要写出更快、更可靠程序的程序员。通过掌握程序是如何映射到系统上，以及程序是如何执行的，读者能够更好的理解程序的行为为什么是这样的，以及效率低下是如何造成的。",
      example: "硅酸盐分子产品筛查",
      themeId: "1",
      fav_nums: 51,
      type: 100
    }, {
      image: "https://img3.doubanio.com/lpic/s1106934.jpg",
      name: "分子催化实验室科研工作简介",
      leader: "郭洪辰",
      company: "大连理工大学",
      mobile: "12542677865",
      assistant: "小张",
      assistantMobile: "12542677865",
      attachment: "https://img3.doubanio.com/lpic/s1106934.jpg",
      summary: "从程序员的视角，看计算机系统！\n本书适用于那些想要写出更快、更可靠程序的程序员。通过掌握程序是如何映射到系统上，以及程序是如何执行的，读者能够更好的理解程序的行为为什么是这样的，以及效率低下是如何造成的。",
      example: "硅酸盐分子产品筛查",
      themeId: "1",
      fav_nums: 51,
      type: 100
    }
  ]);
  db.close();
};

run();
