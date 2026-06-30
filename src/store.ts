import { Shift } from "./shift.ts";

// Simple in memory storage

const shifts = new Map<number, Shift>();

export function shiftFor(userID: number) {
    let shift = shifts.get(userID);
    if (!shift) {
        shift = new Shift();
        shifts.set(userID, shift);
    }
    return shift;
}
