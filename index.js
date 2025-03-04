const { Telegraf } = require(`telegraf`);
const _ = require(`lodash`);
const { GREETING, HEARS_NAME_PINKY, NO_ANSWERS, ANSWER_HAPPY, HEARS_NAME_KIRICH, HEARS_NAME_ARTEM, HEARS_MONEY, HEARS_COFFEE, HEARS_WORK, ANSWER_TO_QUESTION, STICKERS_GOODNIGHT, STICKERS_GOODMORNING, STICKERS_BRAIN } = require(`./src/constants`);

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

bot.start((ctx) => {ctx.reply(_.sample(GREETING));});

//bot.hears(/кирич?/i, (ctx) => {ctx.reply(_.sample(HEARS_NAME_KIRICH))});
//bot.hears(/арт(?:е|ё)м?/i, (ctx) => {ctx.reply(_.sample(HEARS_NAME_ARTEM))});
//bot.hears(/Пинки/, (ctx) => {ctx.reply(_.sample(HEARS_NAME_PINKY))});
//bot.hears(/деньги|денег?(?:ами?|ам|ах)?/i, (ctx) => {ctx.reply(_.sample(HEARS_MONEY))});
//bot.hears(/работ(?:а|ы|е|у|ой|ою)?/gi, (ctx) => {ctx.reply(_.sample(HEARS_WORK))});
//bot.hears(/кофе?й?/gi, (ctx) => {ctx.reply(_.sample(HEARS_COFFEE))});
bot.hears(/[дd]обр(?:ое утро|ого утра|ое|ого)|утречк?|утреца/gi, (ctx) => {
    ctx.replyWithSticker(_.sample(STICKERS_GOODMORNING), { reply_to_message_id: ctx.message.message_id,});
    });
bot.hears(/спок(?:ойной ночи|ойная ночь|ои? ночи|и)/i, (ctx) => {
    ctx.replyWithSticker(_.sample(STICKERS_GOODNIGHT), { reply_to_message_id: ctx.message.message_id,});
    });
bot.hears(/[сc]аморазвити(?:е|я|ю|ем|и)|саморазвиваться/i, (ctx) => {
    ctx.replyWithSticker(_.sample(STICKERS_BRAIN), { reply_to_message_id: ctx.message.message_id,});
    });

bot.on('text', (ctx) => {
    
    if(ctx.message.reply_to_message) {
        const repliedMessage = ctx.message.message_id;
        // Если это ответ на сообщение бота
        if (ctx.message.reply_to_message.from.id === ctx.botInfo.id) {
            //Ответ на сообщение бота
            if (/быкани/i.test(ctx.message.text)) {
                ctx.reply(_.sample(NO_ANSWERS), { reply_to_message_id: repliedMessage, });
            } else if (/\?$/.test(ctx.message.text)) {
                ctx.reply(_.sample(ANSWER_TO_QUESTION), { reply_to_message_id: repliedMessage, });
            } else {
                //ctx.reply(_.sample(ANSWER_HAPPY), { reply_to_message_id: repliedMessage, });
            }
        } else {
            // Это ответ, но не боту
            //ctx.reply('Вы ответили на чужое сообщение.');
        }
    //Не ответ, а просто новое сообщение
                                    }
    }
    );

bot.on('sticker', (ctx) => {
    //const stickerId = ctx.message.sticker.file_id;
    //ctx.reply(`ID стикера: ${stickerId}`);
    if(ctx.message.reply_to_message) {
        const repliedMessage = ctx.message.message_id;
        // Если это ответ на сообщение бота
        if (ctx.message.reply_to_message.from.id === ctx.botInfo.id) {
                ctx.reply(_.sample(NO_ANSWERS), { reply_to_message_id: repliedMessage, });
        }
    }
});

//bot.on('voice', (ctx) => ctx.reply(_.sample(AUDIO)));

module.exports.handler = async function (event, context) {
    const message = JSON.parse(event.body);
    await bot.handleUpdate(message);
    return {
        statusCode: 200,
        body: '',
    };
};
