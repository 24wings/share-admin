"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const route_1 = require("../route");
class ShareAdminRoute extends route_1.Route.BaseRoute {
    doAction(action, method, next) {
        switch (action) {
            case 'login':
                return this.GET == method ? this.loginPage : this.login;
            case 'index':
                return this.index;
            case 'task-list':
                return this.taskList;
            case 'task-detail':
                return this.taskDetail;
            case 'task-delete':
                return this.taskDelete;
            case 'task-edit':
                return this.taskEdit;
            case 'taskTag-list':
                return this.taskTagList;
            case 'taskTag-detail':
                return this.taskTagDetail;
            case 'taskTag-new':
                return this.GET == method ? this.taskTagNewPage : this.taskTagNewPageDo;
            case 'taskTag-edit':
                return this.GET == method ? this.taskTagEditPage : this.taskTagEdit;
            case "taskTag-delete":
                return this.taskTagDelete;
            case 'taskRecord-list':
                return this.taskRecordList;
            case 'taskRecord-detail':
                return this.taskRecordDetail;
            case 'order-detail':
                return this.taskRecordDetail;
            default:
                return this.index;
        }
    }
    async taskEdit() {
        var _id = this.req.query._id;
        var task = await this.service.db.taskModel.findById(_id).populate('taskTag').exec();
        var taskTags = await this.service.db.taskTagModel.find().exec();
        var taskRecords = await this.service.db.taskRecordModel.find({ task: task._id.toString() }).exec();
        this.res.render('share-admin/task-edit', { task, taskRecords, taskTags });
    }
    async taskTagEdit() {
        let { _id, name, sort } = this.req.body;
        await this.service.db.taskTagModel.findByIdAndUpdate(_id, { $set: { name, sort } }).exec();
        this.res.redirect('/share-admin/taskTag-list');
    }
    async taskTagEditPage() {
        let taskTag = await this.service.db.taskTagModel.findById(this.req.query._id).exec();
        let subTasks = await this.service.db.taskModel.find({ taskTag: taskTag._id.toString() }).exec();
        this.res.render('share-admin/taskTag-edit', { taskTag, subTasks });
    }
    login() {
        let { username, password } = this.req.body;
        console.log(username, password);
        if (username == 'admin' && password == '123') {
            this.req.session.admin = {
                username,
                password
            };
            this.res.redirect('/share-admin/index');
        }
        else {
            this.res.render('share-admin/login', { errorMsg: '用户名或密码不正确' });
        }
    }
    loginPage() {
        this.res.render('share-admin/login');
    }
    async index(req, res) {
        // 任务标签总数
        var taskTagNum = await this.service.db.taskTagModel.find().count().exec();
        // 任务数量
        var taskNum = await this.service.db.taskTagModel.find().count().exec();
        var taskActiveNum = await this.service.db.taskTagModel.find({ active: true }).count().exec();
        var recordNum = await this.service.db.taskRecordModel.find().count().exec();
        this.res.render(`share-admin/index`, { taskTagNum, taskNum, taskActiveNum, recordNum });
    }
    async taskTagDelete(req, res) {
        let action = await this.service.db.taskTagModel.findByIdAndRemove(req.query._id).exec();
        res.redirect(`/share-admin/taskTag-list`);
    }
    async taskDelete(req, res) {
        var _id = req.query._id;
        let action = await this.service.db.taskModel.findByIdAndRemove(_id).exec();
        res.redirect(`/share-admin/task-list`);
    }
    async taskList(req, res) {
        var tasks = await this.service.db.taskModel.find().populate('publisher  taskTag').exec();
        res.render(`${this.VIEWDIR}/task-list`, { tasks });
    }
    async taskRecordList(req, res) {
        var taskRecords = await this.service.db.taskRecordModel.find().populate('task').exec();
        res.render(`${this.VIEWDIR}/taskRecord-list`, { taskRecords });
    }
    async taskRecordDetail(req, res) {
        var _id = req.query._id;
        var taskRecord = await this.service.db.taskRecordModel.findById(_id).exec();
        var orders = [];
        for (var detail of taskRecord.shareDetail) {
            let user = await this.service.db.userModel.findById(detail.user).exec();
            orders.push({ user: user, money: detail.money });
        }
        res.render(`${this.VIEWDIR}/taskRecord-detail`, { taskRecord, orders });
    }
    async taskDetail(req, res) {
        var task = await this.service.db.taskModel.findById(req.query._id).populate('publisher taskTag').exec();
        res.render(`${this.VIEWDIR}/task-detail`, { task });
    }
    async taskTagList(req, res) {
        var taskTags = await this.service.db.taskTagModel.find().exec();
        var taskNums = [];
        for (let taskTag of taskTags) {
            taskTag = taskTag._id.toString();
            let taskNum = await this.service.db.taskModel.find({ taskTag }).count().exec();
            taskNums.push(taskNum);
        }
        console.log(taskNums);
        res.render(`share-admin/taskTag-list`, { taskTags, taskNums });
    }
    async taskTagDetail(req, res) {
        var taskTag = await this.service.db.taskTagModel.findById(req.query._id).exec();
        res.render(`${this.VIEWDIR}/taskTag-detail`, { taskTag });
    }
    async taskTagNewPage(req, res) {
        res.render(`${this.VIEWDIR}/taskTag-new`);
    }
    async taskTagNewPageDo(req, res) {
        let { name } = req.body;
        let newTaskTag = await new this.service.db.taskTagModel({ name }).save();
        res.redirect('/share-admin/taskTag-list');
    }
}
exports.ShareAdminRoute = ShareAdminRoute;
