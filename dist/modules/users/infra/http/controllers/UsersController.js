"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _CreateUserService = _interopRequireDefault(require("../../../services/CreateUserService"));

var _classTransformer = require("class-transformer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UsersController {
  async create(request, response) {
    const {
      name,
      email,
      password
    } = request.body;

    const createUser = _tsyringe.container.resolve(_CreateUserService.default);

    const newUser = await createUser.execute({
      name,
      email,
      password
    });
    return response.json((0, _classTransformer.classToClass)(newUser));
  }

}

exports.default = UsersController;