"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _tsyringe = require("tsyringe");

var _IMailTemplateProvider = _interopRequireDefault(require("../../MailTemplateProvider/models/IMailTemplateProvider"));

var _dec, _dec2, _dec3, _dec4, _class, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let EtherealMailProvider = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('MailTemplateProvider')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IMailTemplateProvider.default === "undefined" ? Object : _IMailTemplateProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = (_temp = class EtherealMailProvider {
  constructor(mailTemplateProvider) {
    this.mailTemplateProvider = mailTemplateProvider;
    this.client = void 0;

    _nodemailer.default.createTestAccount().then(account => {
      this.client = _nodemailer.default.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass
        }
      });
    });
  }

  async sendMail(data) {
    var _data$from, _data$from2;

    const message = await this.client.sendMail({
      from: {
        name: ((_data$from = data.from) === null || _data$from === void 0 ? void 0 : _data$from.name) || 'Equipe GoBarber',
        address: ((_data$from2 = data.from) === null || _data$from2 === void 0 ? void 0 : _data$from2.email) || 'equipe@gobarber.com.br'
      },
      to: {
        name: data.to.name,
        address: data.to.email
      },
      subject: data.subject,
      html: await this.mailTemplateProvider.parse(data.templateData)
    });
    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', _nodemailer.default.getTestMessageUrl(message));
  }

}, _temp)) || _class) || _class) || _class) || _class);
exports.default = EtherealMailProvider;