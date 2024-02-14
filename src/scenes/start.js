const {Scenes, Markup} = require("telegraf");
const db = require("../database")
const isAdmin = require("../middlewares/isAdmin");
const scene = new Scenes.BaseScene("start");

scene.enter(async (ctx) => {
    await ctx.reply("Kino kodini yuboring");
});

scene.command('/start', (ctx) => ctx.scene.enter('start'));
scene.command('/admin', isAdmin, (ctx) => ctx.scene.enter('admin'));
scene.on('text', async (ctx) => {
    let id = ctx.message?.text
    const movie = await db.controllers.movies.getById(id)

    if (!movie) {
      return await ctx.reply("Kino topilmadi");
    }

    let caption = `${movie.name}\n\n@${ctx.botInfo.username}`

    await ctx.replyWithVideo(
        movie.fileId,
        {
            caption,
            reply_markup: {
                inline_keyboard: [
                    [{ text: 'Tugma matni', url: 'https://example.com' }]
                ]
            }
        }
    )
});

module.exports = scene;
