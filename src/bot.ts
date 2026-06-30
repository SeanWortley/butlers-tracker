import { Bot } from "grammy";

export function initializeBot() {
    const bot = new Bot(process.env.BOT_TOKEN!);
    bot.start();

    bot.on(["message:text", "message:caption"], (ctx) => {
        const text = ctx.message.text ?? ctx.message.caption;

        console.log(text);
    })
}
