"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _tsyringe = require("tsyringe");

var _IHashProvider = _interopRequireDefault(require("../providers/HashProvider/models/IHashProvider"));

var _IUsersRepository = _interopRequireDefault(require("../repositories/IUsersRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let UpdateProfileService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('HashProvider')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IUsersRepository.default === "undefined" ? Object : _IUsersRepository.default, typeof _IHashProvider.default === "undefined" ? Object : _IHashProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class UpdateProfileService {
  constructor(usersRepository, hashProvider) {
    this.usersRepository = usersRepository;
    this.hashProvider = hashProvider;
  }

  async execute({
    name,
    email,
    userId,
    password,
    oldPassword
  }) {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new _AppError.default('User not found', 400);
    }

    const findedUserByEmail = await this.usersRepository.findByEmail(email);

    if (findedUserByEmail && findedUserByEmail.id !== userId) {
      throw new _AppError.default('E-mail already in use', 400);
    }

    user.name = name;
    user.email = email;

    if (password && oldPassword) {
      const comparedPassword = await this.hashProvider.compareHash(oldPassword, user.password);

      if (!comparedPassword) {
        throw new _AppError.default('Old password does not match', 400);
      }

      user.password = await this.hashProvider.generateHash(password);
    } else if (password) {
      throw new _AppError.default('The old password need to be informed to set the new');
    }

    const updatedUser = this.usersRepository.save(user);
    return updatedUser;
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.default = UpdateProfileService;