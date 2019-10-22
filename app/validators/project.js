'use strict';

const { LinValidator, Rule } = require('lin-mizar');

class ProjectSearchValidator extends LinValidator {
  constructor () {
    super();
    this.q = new Rule('isNotEmpty', '必须传入搜索关键字');
  }
}

class CreateOrUpdateProjectValidator extends LinValidator {
  constructor () {
    super();
    this.image = new Rule('isNotEmpty', '必须传入图片路径')
    this.title = new Rule('isNotEmpty', '必须传项目名')
    this.leader = new Rule('isNotEmpty', '必须传入负责人')
    this.company = new Rule('isNotEmpty', '必须传入单位')
    this.assistant = new Rule('isNotEmpty', '必须传入助理姓名')
    this.assistantMobile = new Rule('isNotEmpty', '必须传入助理电话')
    this.attachment = new Rule('isNotEmpty', '必须传入附件路径')
    this.summary = new Rule('isNotEmpty', '必须传入简介')
    this.example = new Rule('isNotEmpty', '必须传入应用')
    this.themeId = new Rule('isNotEmpty', '必须传入分类')
  }
}

module.exports = {
  CreateOrUpdateProjectValidator,
  ProjectSearchValidator
};
