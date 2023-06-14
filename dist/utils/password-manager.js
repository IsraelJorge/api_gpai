"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchPassword = exports.hashPassword = void 0;
const crypto_1 = require("crypto");
// Pass the password string and get hashed password back
// ( and store only the hashed string in your database)
const encryptPassowrd = (password, salt) => {
    return (0, crypto_1.scryptSync)(password, salt, 32).toString('hex');
};
/**
 * Hash password with random salt
 * @return {string} password hash followed by salt
 *  XXXX till 64 XXXX till 32
 *
 */
const hashPassword = (password) => {
    // Any random string here (ideally should be atleast 16 bytes)
    const salt = (0, crypto_1.randomBytes)(16).toString('hex');
    return encryptPassowrd(password, salt) + salt;
};
exports.hashPassword = hashPassword;
/**
 * Match password against the stored hash
 */
const matchPassword = (passowrd, hash) => {
    // extract salt from the hashed string
    // our hex password length is 32*2 = 64
    const salt = hash.slice(64);
    const originalPassHash = hash.slice(0, 64);
    const currentPassHash = encryptPassowrd(passowrd, salt);
    return originalPassHash === currentPassHash;
};
exports.matchPassword = matchPassword;
