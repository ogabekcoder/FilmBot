const config = require("../utils/config");

const RedisSession = require("telegraf-session-redis");
const { session: memorySession } = require("telegraf");

const session = memorySession();

module.exports = session;
