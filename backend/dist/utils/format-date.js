"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDate = void 0;
// 2024-11-13T18:30:00.000Z -> 13-Nov-2024
const formatDate = (date) => {
    const day = new Date(date).getDate();
    const month = new Date(date).toLocaleString("default", { month: "short" });
    const year = new Date(date).getFullYear();
    return `${day}-${month}-${year}`;
};
exports.formatDate = formatDate;
