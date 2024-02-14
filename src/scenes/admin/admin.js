const { Scenes, Markup } = require("telegraf");

const adminScene = new Scenes.BaseScene("admin");

adminScene.enter(async (ctx) => {
    let keyboard = Markup.keyboard([
        ["➕ Film qo'shish", "🎞 Filmlar"],
    ]).resize();

    await ctx.reply(
        "👑 Admin paneli",
        keyboard
    );
});

adminScene.hears("➕ Film qo'shish", (ctx) => ctx.scene.enter("admin:movies:new"))
adminScene.hears("🎞 Filmlar", (ctx) => ctx.scene.enter("admin:movies"))


module.exports = adminScene;
