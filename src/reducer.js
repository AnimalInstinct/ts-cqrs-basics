"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.reducers = exports.reduceProductState = exports.createReducer = void 0;
function createReducer(params) {
    return params;
}
exports.createReducer = createReducer;
function reduceProductState(events) {
    return events.reduce(function (state, event) {
        switch (event.type) {
            case "ProductCreated":
                return __assign(__assign({}, state), { id: event.id, name: event.name, price: event.price, version: state.version + 1 });
            case "ProductPriceChanged":
                return __assign(__assign({}, state), { price: event.price, version: state.version + 1 });
        }
    }, { version: 0 });
}
exports.reduceProductState = reduceProductState;
exports.reducers = {
    reduceProduct: createReducer(reduceProductState)
};
