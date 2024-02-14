const { Scenes, Markup } = require("telegraf");

const adminScene = new Scenes.BaseScene("admin");

adminScene.enter(async (ctx) => {
    let keyboard = Markup.keyboard([
        ["➕ Film qo'shish", "🎞 Filmlar"],
        ["📡 Kanallar", "📊 Statistika"],
        ["◀️ Paneldan chiqish"]
    ]).resize();

    await ctx.reply(
        "👑 Admin paneli",
        keyboard
    );
});

adminScene.command('/start', (ctx) => ctx.scene.enter('start'));

adminScene.hears("➕ Film qo'shish", (ctx) => ctx.scene.enter("admin:movies:new"))
adminScene.hears("🎞 Filmlar", (ctx) => {
    ctx.reply("Bu ishlamaydi🤦‍♂️")
})
adminScene.hears("📡 Kanallar", (ctx) => ctx.scene.enter("admin:channels"))
adminScene.hears("📊 Statistika", ctx => ctx.scene.enter('admin:statistics'));


adminScene.hears("◀️ Paneldan chiqish", ctx => ctx.scene.enter('start'));

module.exports = adminScene;
