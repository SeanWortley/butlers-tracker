import type { Order } from "./order.ts";

export function parseOrder(text: string): Order | undefined {

    // Uber order
    if (text.startsWith("Trip")) {

        const match = text.match(/Total R(\d+\.\d{2})/);
        if (match) {
            const total = Number(match[1]);
            const order: Order = { type: "uber", total: total };
            return order;
        }
    }

    // Snapscan order
    if (text.startsWith("Payment received")) {

        const matchReceived = text.match(/amount of R(\d+\.\d{2})/);
        const matchTip = text.match(/tip of R(\d+\.\d{2})/);

        if (matchReceived && matchTip) {
            const received = Number(matchReceived[1]);
            const tip = Number(matchTip[1]);
            const order: Order = { type: "snapscan", received: received, tip: tip };
            return order;
        }
    }
}
