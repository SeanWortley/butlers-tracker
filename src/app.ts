import { parseOrder } from "./parse.ts";
import { Shift } from "./shift.ts";

export function recordText(shift: Shift, text: string) {
    const order = parseOrder(text);
    if (order) {
        shift.addOrder(order);
    }

}
