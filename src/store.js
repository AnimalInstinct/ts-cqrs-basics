"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.models = exports.stores = exports.createReadModelStore = exports.createEventStore = void 0;
function createEventStore() {
    var db = [];
    var eventHandlers = {};
    function append(event) {
        db.push(event);
        var keys = Object.keys(eventHandlers);
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            var handler = eventHandlers[key];
            if (handler) {
                handler(event);
            }
        }
    }
    function get(id) {
        return db.filter(function (e) { return e.id === id; });
    }
    function getAll() {
        return __spreadArrays(db);
    }
    function registerEventHandler(eventHandler, handlerName) {
        console.log("registered event handler");
        eventHandlers[handlerName] = eventHandler;
    }
    return {
        append: append,
        get: get,
        getAll: getAll,
        registerEventHandler: registerEventHandler
    };
}
exports.createEventStore = createEventStore;
function createReadModelStore() {
    var db = {};
    function read(id) {
        return db[id];
    }
    function readAll() {
        var models = [];
        for (var _i = 0, _a = Object.keys(db); _i < _a.length; _i++) {
            var key = _a[_i];
            var model = db[key];
            if (model) {
                models.push(model);
            }
        }
        return models;
    }
    function write(model) {
        db[model.id] = model;
    }
    return {
        read: read,
        readAll: readAll,
        write: write
    };
}
exports.createReadModelStore = createReadModelStore;
exports.stores = {
    product: createEventStore()
};
exports.models = {
    product: createReadModelStore()
};
