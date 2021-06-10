import { ProductEvent, ProductModel } from "./types";

export type StoredEvent = {
  id: string;
  type: string;
};

export type ReadModel = {
  id: string;
};

export function createEventStore<T extends StoredEvent>() {
  const db: T[] = [];
  const eventHandlers: { [K in string]?: (event: T) => void } = {};

  function append(event: T) {
    db.push(event);
    const keys = Object.keys(eventHandlers);
    for (const key of keys) {
      const handler = eventHandlers[key];
      if (handler) {
        handler(event);
      }
    }
  }

  function get(id: string): T[] {
    return db.filter((e) => e.id === id);
  }

  function getAll(): T[] {
    return [...db];
  }

  function registerEventHandler(
    eventHandler: (event: T) => void,
    handlerName: string
  ) {
    console.log("registered event handler");
    eventHandlers[handlerName] = eventHandler;
  }

  return {
    append,
    get,
    getAll,
    registerEventHandler,
  };
}

export function createReadModelStore<TModel extends ReadModel>() {
  const db: { [K in string]?: TModel } = {};

  function read(id: string): TModel | undefined {
    return db[id];
  }

  function readAll(): TModel[] {
    const models: TModel[] = [];
    for (const key of Object.keys(db)) {
      const model = db[key];
      if (model) {
        models.push(model);
      }
    }
    return models;
  }

  function write(model: TModel) {
    db[model.id] = model;
  }

  return {
    read,
    readAll,
    write,
  };
}

export const stores = {
  product: createEventStore<ProductEvent>(),
};

export const models = {
  product: createReadModelStore<ProductModel>(),
};
