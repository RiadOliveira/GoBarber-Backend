"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _upload = _interopRequireDefault(require("../../../../../config/upload"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DiskStorageProvider {
  async saveFile(fileName) {
    await _fs.default.promises.rename(_path.default.resolve(_upload.default.tmpFolder, fileName), _path.default.resolve(_upload.default.uploadsFolder, fileName));
    return fileName;
  }

  async deleteFile(fileName) {
    const filePath = _path.default.resolve(_upload.default.uploadsFolder, fileName);

    try {
      await _fs.default.promises.stat(filePath);
    } catch {
      return;
    }

    await _fs.default.promises.unlink(filePath);
  }

}

var _default = DiskStorageProvider;
exports.default = _default;