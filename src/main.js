require("dotenv").config();
require("./database")

const bot = require("./core/bot");
const session = require("./core/session");
const stage = require("./scenes");
const startBot = require("./utils/startBot");
const auth = require('./middlewares/auth');
const isAdmin = require('./middlewares/isAdmin');
const subscribing = require('./middlewares/subscribing');

const { isProduction } = require("./utils")

bot.use(session);
bot.use((ctx, next) => { if (!ctx.session) { ctx.session = {}; }; next()});

bot.use(auth)
bot.use(subscribing);

bot.use(stage.middleware());

bot.start((ctx) => ctx.scene.enter("start"));

bot.command('admin', isAdmin, (ctx) => ctx.scene.enter('admin'))

bot.catch((err, ctx) => {
    if (isProduction()) return;
    console.log(err);
    console.log(ctx);
})

startBot(bot);
