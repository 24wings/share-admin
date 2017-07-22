"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const service = require("./services");
var Route;
(function (Route) {
    class BaseRoute extends Object {
        constructor() {
            super();
            this.GET = 'get';
            this.POST = 'post';
            this.DELETE = 'delete';
            this.PUT = 'put';
            this.service = service;
        }
        doAction(action, method, next) {
            return next;
        }
    }
    Route.BaseRoute = BaseRoute;
    class RouteBuilder {
        /**
         *
         * 构建路由
         */
        static buildRoute(routeClass) {
            var route = new routeClass();
            return (req, res, next) => {
                route.doAction(req.params.action, req.method.toLowerCase(), next).bind({ req, res, service, GET: 'get', POST: 'post' })(req, res, next);
            };
        }
        static buildMiddle() {
            return;
        }
    }
    Route.RouteBuilder = RouteBuilder;
})(Route = exports.Route || (exports.Route = {}));
