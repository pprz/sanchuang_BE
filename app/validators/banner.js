'use strict';

const { LinValidator, Rule } = require('lin-mizar');

class BannerSearchValidator extends LinValidator {
  constructor () {
    super()
    this.q = new Rule('isNotEmpty', '必须传入搜索关键字');
  }
}

class CreateOrUpdateBannerValidator extends LinValidator {
  constructor () {
    super();
    this.artId = new Rule('isNotEmpty', '项目id不能为空')
    this.image = new Rule('isNotEmpty', '图书插图的url长度必须在0~200之间'
    // {min: 0,max: 200}
    );
  }
}

module.exports = { BannerSearchValidator, CreateOrUpdateBannerValidator }