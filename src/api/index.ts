import { v4 as uuid } from "uuid";
import { reducers } from "../reducer";
import { models, stores } from "../store";
import { ProductCommand, ProductEvent } from "../types";

// Commands
export function createProduct(params: { name: string; price: number }) {
  const id = uuid();

  const cmd: ProductCommand = {
    id,
    type: "CreateProduct",
    name: params.name,
    price: params.price,
  };

  const events = stores.product.get(id);
  const state = reducers.reduceProduct(events);

  // Command handler start
  if (state.version) {
    return state;
  }

  if (!cmd.name || !cmd.price || typeof cmd.price !== "number") {
    throw new Error("Invalid params");
  }

  const event: ProductEvent = {
    id: cmd.id,
    type: "ProductCreated",
    name: cmd.name,
    price: cmd.price,
  };
  stores.product.append(event);

  // Command handler end

  const newEvents = stores.product.get(id);
  const newState = reducers.reduceProduct(newEvents);

  return newState;
}

export function changeProductPrice(params: { id: string; price: number }) {
  const cmd: ProductCommand = {
    id: params.id,
    type: "ChangeProductPrice",
    price: params.price,
  };

  const events = stores.product.get(params.id);
  const state = reducers.reduceProduct(events);

  if (!state.version) {
    throw new Error("Product does not exist");
  }

  if (state.price === cmd.price) {
    return;
  }

  const event: ProductEvent = {
    id: params.id,
    type: "ProductPriceChanged",
    price: cmd.price,
  };
  stores.product.append(event);

  const newEvents = stores.product.get(params.id);
  const newState = reducers.reduceProduct(newEvents);

  return newState;
}

// Queries

export function getProduct(id: string) {
  const product = models.product.read(id);
  return product;
}

export function getProducts() {
  const products = models.product.readAll();
  return products;
}
