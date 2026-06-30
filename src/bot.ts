import { Bot } from "grammy";
import { recordText } from "./app.ts";
import { shiftFor } from "./store.ts";

export function initializeBot() {
    const bot = new Bot(process.env.BOT_TOKEN!);
    bot.start();

    bot.on(["message:text", "message:caption"], (ctx) => {
        const userID = ctx.from?.id;
        if (!userID) return;

        const text = ctx.message.text ?? ctx.message.caption;
        const shift = shiftFor(userID);

        console.log(text);
        const reply = recordText(shift, text);
        if (reply) ctx.reply(reply);
    })
}
