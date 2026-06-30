export type Order =
    | { type: "snapscan"; received: number; tip: number }
    | { type: "uber"; total: number }
    | { type: "cash"; received: number; total: number };


export function earnings(order: Order) {
    switch (order.type) {
        case "snapscan": return (order.received - order.tip) * 0.02 + order.tip;
        case "uber": return order.total * 0.12;
        case "cash": return order.total * 0.02 + (order.received - order.total);
    }
}
