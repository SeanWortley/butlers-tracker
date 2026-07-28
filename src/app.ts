import { parseOrder } from "./parse.ts";
import { Shift } from "./shift.ts";
import { earnings } from "./order.ts";

export function recordText(shift: Shift, text: string): string | undefined {
    const order = parseOrder(text);
    if (!order) return undefined;
    shift.addOrder(order);

    return `You made R${earnings(order).toFixed(2)}. Shift total: R${shift.getTotal().toFixed(2)}`;
}

export function newShift(shift: Shift): string {

    shift.wipeShift();
    return "Welcome to your new shift :)\nTo log uber orders, send the first message that comes through associated with that order.\nTo log snapscan or credit card orders, send the successful payment link photo.\nTo log cash orders, click the \"enter cash\" button."

}
