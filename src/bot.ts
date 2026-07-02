import { Bot, InlineKeyboard, Context } from "grammy";
import { conversations, createConversation } from "@grammyjs/conversations";
import type { Conversation, ConversationFlavor } from "@grammyjs/conversations";
import { recordText } from "./app.ts";
import { shiftFor } from "./store.ts";
import { type Order, earnings } from "./order.ts";

type MyContext = ConversationFlavor<Context>;

export function initializeBot() {
    const bot = new Bot<MyContext>(process.env.BOT_TOKEN!);
    bot.use(conversations());
    bot.use(createConversation(cashOrder))

    bot.on(["message:text", "message:caption"], (ctx) => {
        const userID = ctx.from?.id;
        if (!userID) return;

        const text = ctx.message.text ?? ctx.message.caption;
        const shift = shiftFor(userID);

        console.log(text);
        const reply = recordText(shift, text);
        if (reply) sendTotal(ctx, reply);
    })

    bot.callbackQuery("enter_cash", async (ctx) => {
        await ctx.answerCallbackQuery();
        await ctx.conversation.enter("cashOrder");
    })

    bot.start();
}

async function cashOrder(conversation: Conversation, ctx: Context) {
    const userID = ctx.from?.id;
    if (!userID) return;

    await ctx.reply("Cash received?");
    const received = await conversation.form.number(async (ctx) => {
        await ctx.reply("Cash order cancelled.")
    });

    await ctx.reply("Order total?");
    const total = await conversation.form.number(async (ctx) => {
        await ctx.reply("Cash order cancelled.")
    });

    const order: Order = { type: "cash", received: received, total: total };

    const shift = shiftFor(ctx.from?.id);
    shift.addOrder(order);

    sendTotal(ctx, `You made R${earnings(order).toFixed(2)}. Shift total: R${shift.getTotal().toFixed(2)}`)

}
function sendTotal(ctx: Context, text: string) {
    const cashButton = new InlineKeyboard().text("Enter cash order", "enter_cash");
    ctx.reply(text, { reply_markup: cashButton });

}
