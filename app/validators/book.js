'use strict';

const { LinValidator, Rule } = require('lin-mizar');

class BookSearchValidator extends LinValidator {
  constructor () {
    super();
    this.q = new Rule('isNotEmpty', '必须传入搜索关键字');
  }
}

class CreateOrUpdateBookValidator extends LinValidator {
  constructor () {
    super();
    this.title = new Rule('isNotEmpty', '必须传入图书名');
    this.author = new Rule('isNotEmpty', '必须传入图书作者');
    this.summary = new Rule('isNotEmpty', '必须传入图书综述');
    this.image = new Rule('isNotEmpty', '图书插图的url长度必须在0~200之间'
    // {min: 0,max: 200}
    );
  }
}

module.exports = {
  CreateOrUpdateBookValidator,
  BookSearchValidator
};
