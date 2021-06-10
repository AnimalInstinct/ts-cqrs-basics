import { changeProductPrice, createProduct } from "./src/api";
import { updateProductModel } from "./src/event-handler";
import { models, stores } from "./src/store";

stores.product.registerEventHandler(updateProductModel, "productModel");

console.log("Creating two products");

const kolbasaAggregate = createProduct({ name: "kolbasa", price: 100 });
const ulitkaAggregate = createProduct({ name: "ulitka", price: 200 });

changeProductPrice({ id: kolbasaAggregate.id, price: 300 });
changeProductPrice({ id: kolbasaAggregate.id, price: 500 });

const productEvents = stores.product.getAll();
const products = models.product.readAll();

const kolbasa = models.product.read(kolbasaAggregate.id);

console.log("productEvents", productEvents);
console.log("products", products);
console.log("kolbasa", kolbasa);
