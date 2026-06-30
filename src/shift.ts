import { earnings, type Order } from "./order.ts";

export class Shift {
    private orders: Order[] = [];

    addOrder(order: Order) {
        this.orders.push(order);
    }

    getTotal(): number {
        let total = 0;
        for (const order of this.orders) {
            total += earnings(order);
        }
        return total;
    }
};
