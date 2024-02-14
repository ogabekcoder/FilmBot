const {Scenes: {WizardScene}, Markup} = require('telegraf');
const db = require('../../database');

const adminNewMovieScene = new WizardScene(
    'admin:movies:new',
    (ctx) => {
        let text = "✍️ Yangi film uchun nom kiriting";
        let keyboard = Markup.keyboard([
            ["◀️ Ortga"]
        ]).resize()
        ctx.reply(text, keyboard);
        return ctx.wizard.next();
    },
    (ctx) => {
        let name = ctx.message?.text;
        if (!name) {
            return ctx.scene.reenter();
        }
        ctx.wizard.state.name = name;
        let text = "📁 Filmni video ko'rinishda yuklang";
        ctx.reply(text);
        return ctx.wizard.next();
    },
    async (ctx) => {
        let video = ctx.message?.video;
        if (!video) {
            let text = "❗️ Video ko'rinishda yuboring!";
            return ctx.reply(text);
        }
        ctx.wizard.state.fileId = video.file_id;
        let movie = await db.controllers.movies.create(ctx.wizard.state);
        let text = `✅ Video yuklandi.\n🆔 Film Idisi: ${movie.id}`;
        ctx.reply(text);
        return ctx.scene.enter('admin');
    }
);

adminNewMovieScene.hears('❌ Bekor qilish', ctx => ctx.scene.enter('admin:movies'));

module.exports = adminNewMovieScene;