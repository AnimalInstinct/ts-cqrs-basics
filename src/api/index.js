"use strict";
exports.__esModule = true;
exports.getProducts = exports.getProduct = exports.changeProductPrice = exports.createProduct = void 0;
var uuid_1 = require("uuid");
var reducer_1 = require("../reducer");
var store_1 = require("../store");
// Commands
function createProduct(params) {
    var id = uuid_1.v4();
    var cmd = {
        id: id,
        type: "CreateProduct",
        name: params.name,
        price: params.price
    };
    var events = store_1.stores.product.get(id);
    var state = reducer_1.reducers.reduceProduct(events);
    // Command handler start
    if (state.version) {
        return state;
    }
    if (!cmd.name || !cmd.price || typeof cmd.price !== "number") {
        throw new Error("Invalid params");
    }
    var event = {
        id: cmd.id,
        type: "ProductCreated",
        name: cmd.name,
        price: cmd.price
    };
    store_1.stores.product.append(event);
    // Command handler end
    var newEvents = store_1.stores.product.get(id);
    var newState = reducer_1.reducers.reduceProduct(newEvents);
    return newState;
}
exports.createProduct = createProduct;
function changeProductPrice(params) {
    var cmd = {
        id: params.id,
        type: "ChangeProductPrice",
        price: params.price
    };
    var events = store_1.stores.product.get(params.id);
    var state = reducer_1.reducers.reduceProduct(events);
    if (!state.version) {
        throw new Error("Product does not exist");
    }
    if (state.price === cmd.price) {
        return;
    }
    var event = {
        id: params.id,
        type: "ProductPriceChanged",
        price: cmd.price
    };
    store_1.stores.product.append(event);
    var newEvents = store_1.stores.product.get(params.id);
    var newState = reducer_1.reducers.reduceProduct(newEvents);
    return newState;
}
exports.changeProductPrice = changeProductPrice;
// Queries
function getProduct(id) {
    var product = store_1.models.product.read(id);
    return product;
}
exports.getProduct = getProduct;
function getProducts() {
    var products = store_1.models.product.readAll();
    return products;
}
exports.getProducts = getProducts;
