"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
var taskSchema = new mongoose.Schema({
    title: String,
    totalMoney: { type: Number, default: 0.00 },
    shareMoney: { type: Number, default: 0.00 },
    taskTag: { type: mongoose.Schema.Types.ObjectId, ref: 'TaskTag' },
    imageUrl: { type: String },
    websiteUrl: String,
    createDt: { type: Date, default: Date.now },
    publisher: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    // 浏览数量
    pv: { type: Number, default: 0 }
});
exports.taskModel = mongoose.model('Task', taskSchema);
