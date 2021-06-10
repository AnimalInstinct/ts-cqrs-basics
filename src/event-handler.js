"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.updateProductModel = void 0;
var store_1 = require("./store");
function updateProductModel(event) {
    switch (event.type) {
        case "ProductCreated":
            store_1.models.product.write({
                id: event.id,
                name: event.name,
                currentPrice: event.price,
                priceHistory: []
            });
            break;
        case "ProductPriceChanged":
            var model = store_1.models.product.read(event.id);
            model.currentPrice = event.price;
            model.priceHistory = __spreadArrays(model.priceHistory, [event.price]);
            break;
    }
}
exports.updateProductModel = updateProductModel;
