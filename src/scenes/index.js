const { Scenes } = require("telegraf");

const stage = new Scenes.Stage([
    require("./start"),
    ...require("./admin")
]);

module.exports = stage;
