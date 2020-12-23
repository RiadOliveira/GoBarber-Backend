"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _UserToken = _interopRequireDefault(require("../../infra/typeorm/entities/UserToken"));

var _uuid = require("uuid");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FakeUserTokensRepository {
  constructor() {
    this.userTokens = [];
  }

  async generate(userId) {
    const userToken = new _UserToken.default();
    Object.assign(userToken, {
      id: (0, _uuid.v4)(),
      token: (0, _uuid.v4)(),
      userId,
      createdAt: Date.now(),
      updatedAt: Date.now()
    });
    this.userTokens.push(userToken);
    return userToken;
  }

  async findByToken(token) {
    const findedUser = this.userTokens.find(userToken => userToken.token === token);
    return findedUser;
  }

}

var _default = FakeUserTokensRepository;
exports.default = _default;