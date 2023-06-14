"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeKeyObject = void 0;
function removeKeyObject(obj, key) {
    const newObj = { ...obj };
    delete newObj[key];
    return newObj;
}
exports.removeKeyObject = removeKeyObject;
