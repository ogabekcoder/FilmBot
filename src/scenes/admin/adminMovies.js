const { Scenes, Markup } = require("telegraf");

const adminMovieScene = new Scenes.BaseScene("admin:movies");

adminMovieScene.enter(async (ctx) => {
    let keyboard = Markup.keyboard([
        ["➕ Film qo'shish", "🎞 Filmlar"],
    ]).resize();

    await ctx.reply(
        "Filmlar",
        keyboard
    );
});

module.exports = adminMovieScene;
