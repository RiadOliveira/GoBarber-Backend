"use strict";

var _tsyringe = require("tsyringe");

var _EtherealMailProvider = _interopRequireDefault(require("./implementations/EtherealMailProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const providers = {
  ethereal: _EtherealMailProvider.default
};

_tsyringe.container.registerInstance('MailProvider', _tsyringe.container.resolve(providers.ethereal));