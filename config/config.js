require('dotenv').config();

const JWT_OWNER = process.env.JWT_OWNER;
const JWT_USER = process.env.JWT_USER;

module.exports = {
    JWT_OWNER,
    JWT_USER
}