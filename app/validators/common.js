'use strict';

const { LinValidator, Rule } = require('lin-mizar');
const { config } = require('lin-mizar/lin/config');

class PositiveIdValidator extends LinValidator {
  constructor () {
    super();
    this.id = new Rule('isInt', 'id必须为正整数', { min: 1 });
  }
}

class PaginateValidator extends LinValidator {
  constructor () {
    super();
    this.count = [
      new Rule('isOptional', '', config.getItem('countDefault')),
      new Rule('isInt', 'count必须为正整数', { min: 1 })
    ];
    this.page = [
      new Rule('isOptional', '', config.getItem('pageDefault')),
      new Rule('isInt', 'page必须为整数，且大于等于0', { min: 0 })
    ];
  }
}

class SearchValidator extends LinValidator {
  constructor () {
    super()
    this.q = [
      new Rule('isLength', '搜索关键词不能为空', {
        min: 1,
        max: 16
      })
    ]
    this.start = [
      new Rule('isInt', '不符合规范', {
        min: 0,
        max: 60000
      }),
      new Rule('isOptional', '', 0)
    ]
    this.count = [
      new Rule('isInt', '不符合规范', {
        min: 1,
        max: 20
      }),
      new Rule('isOptional', '', 20)
    ]
  }
}

module.exports = {
  PaginateValidator,
  PositiveIdValidator,
  SearchValidator
};
