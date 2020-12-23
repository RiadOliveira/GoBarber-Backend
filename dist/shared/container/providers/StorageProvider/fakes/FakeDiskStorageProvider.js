"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class FakeDiskStorageProvider {
  constructor() {
    this.storage = [];
  }

  async saveFile(fileName) {
    this.storage.push(fileName);
    return fileName;
  }

  async deleteFile(fileName) {
    this.storage.splice(this.storage.indexOf(fileName), 1);
  }

}

var _default = FakeDiskStorageProvider;
exports.default = _default;