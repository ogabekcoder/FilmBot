const { Scenes: { BaseScene }, Markup} = require('telegraf');
const db = require('../../database');
const { bold, italic } = require('../../utils/format');

const statisticsScene = new BaseScene('admin:statistics');

statisticsScene.enter(async (ctx) => {
    // users
    const users = await db.controllers.users.getCount();

    // videos
    const movies = await db.controllers.movies.getCount();

    // channels
    const channels = await db.controllers.channels.getCount();

    let text = bold("📊 Statistika\n");
    text += bold("\n👤 Foydalanuvchilar soni: ") + users;
    text += bold("\n\n🎬 Filmlar soni: ") + movies;
    text += bold("\n\n📡 Kanallar soni: ") + channels;

    let keyboard =  Markup.keyboard([
        ["✍️ Umumiy xabar"],
        ["◀️ Ortga"]
    ]).resize();
    ctx.replyWithHTML(text, keyboard);
});

statisticsScene.hears("◀️ Ortga", ctx => ctx.scene.enter('admin'));
statisticsScene.hears("✍️ Umumiy xabar", ctx => ctx.scene.enter('admin:commonMsg'));

module.exports = statisticsScene;
