"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
/*
openid: 'ovMVW1nHydcD5YFwfQG2QNc2Dr0Q',
  nickname: 'A          z',
  sex: 1,
  language: 'zh_CN',
  city: 'Wuhan',
  province: 'Hubei',
  country: 'China',
  headimgurl: 'http://wx.qlogo.cn/mmopen/ajNVdqHZLLAspZZAQua7bcGKRdic3QAjuH7907el8g5hMrwicmxlKRZxfxgEgibsBKDxHke4YxJcUJOk0q3gPmwe9w6ic6E3z5VOOHU1JDZXNZc/0',
  privilege: []
  */
exports.userModel = mongoose.model('User', new mongoose.Schema({
    nickname: String,
    openid: String,
    avatar: String,
    sex: Number,
    city: String,
    language: String,
    province: String,
    country: String,
    headimgurl: String,
    privilege: [String],
    createDt: { type: Date, default: Date.now },
    //余额
    money: { type: Number, default: 0.00 },
    inviteMoney: { type: Number, default: 0 },
    //任务累计收益,
    taskMoney: { type: Number, default: 0 },
    //历史总金钱
    totalMoney: { type: Number, default: 0.00 },
    //徒弟数量
    personNum: { type: Number, default: 0 },
}));
