'use strict';

const { HttpException } = require('lin-mizar');
const assert = require('assert');
const { isInteger } = require('lodash');

class BookNotFound extends HttpException {
  constructor (ex) {
    super();
    this.code = 404;
    this.msg = '没有找到相关图书';
    this.errorCode = 80010;
    if (ex && ex.code) {
      assert(isInteger(ex.code));
      this.code = ex.code;
    }
    if (ex && ex.msg) {
      this.msg = ex.msg;
    }
    if (ex && ex.errorCode) {
      assert(isInteger(ex.errorCode));
      this.errorCode = ex.errorCode;
    }
  }
}

class ProjectNotFound extends HttpException {
  constructor (ex) {
    super();
    this.code = 404;
    this.msg = '没有找到相关项目';
    this.errorCode = 80010;
    if (ex && ex.code) {
      assert(isInteger(ex.code));
      this.code = ex.code;
    }
    if (ex && ex.msg) {
      this.msg = ex.msg;
    }
    if (ex && ex.errorCode) {
      assert(isInteger(ex.errorCode));
      this.errorCode = ex.errorCode;
    }
  }
}

class ParameterException extends HttpException {
  constructor (msg, errorCode) {
    super()
    this.code = 400
    this.msg = msg || '参数错误'
    this.errorCode = errorCode || 10000
  }
}

class Success extends HttpException {
  constructor (msg, errorCode) {
    super()
    this.code = 201
    this.msg = msg || 'ok'
    this.errorCode = errorCode || 0
  }
}

class NotFound extends HttpException {
  constructor (msg, errorCode) {
    super()
    this.msg = msg || '资源未找到'
    this.errorCode = errorCode || 10000
    this.code = 404
  }
}

class AuthFailed extends HttpException {
  constructor (msg, errorCode) {
    super()
    this.msg = msg || '授权失败'
    this.errorCode = errorCode || 10004
    this.code = 401
  }
}

class Forbbiden extends HttpException {
  constructor (msg, errorCode) {
    super()
    this.msg = msg || '禁止访问'
    this.errorCode = errorCode || 10006
    this.code = 403
  }
}

class LikeError extends HttpException {
  constructor (msg, error_code) {
    super()
    this.code = 400
    this.msg = "你已经点赞过"
    this.error_code = 60001 || error_code
  }
}

class DislikeError extends HttpException {
  constructor (msg, error_code) {
    super()
    this.code = 400
    this.msg = "你已取消点赞"
    this.error_code = 60002 || error_code
  }
}

module.exports = {
  BookNotFound,
  Success,
  NotFound,
  AuthFailed,
  Forbbiden,
  LikeError,
  DislikeError,
  ParameterException,
  ProjectNotFound };
