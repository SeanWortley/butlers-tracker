import { parseOrder } from "./parse.ts";
import { Shift } from "./shift.ts";
import { earnings } from "./order.ts";

export function recordText(shift: Shift, text: string): string | undefined {
    const order = parseOrder(text);
    if (!order) return undefined;
    shift.addOrder(order);

    return `You made R${earnings(order).toFixed(2)}. Shift total: R${shift.getTotal().toFixed(2)}`;
}
