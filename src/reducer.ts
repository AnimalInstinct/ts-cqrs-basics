import { StoredEvent } from "./store";
import { ProductEvent, ProductState } from "./types";

type State = {
  id: string;
  version: number;
};

export function createReducer<TEvt extends StoredEvent, TState extends State>(
  params: (events: TEvt[]) => TState
) {
  return params;
}

export function reduceProductState(events: ProductEvent[]): ProductState {
  return events.reduce(
    (state, event) => {
      switch (event.type) {
        case "ProductCreated":
          return {
            ...state,
            id: event.id,
            name: event.name,
            price: event.price,
            version: state.version + 1,
          };

        case "ProductPriceChanged":
          return { ...state, price: event.price, version: state.version + 1 };
      }
    },
    { version: 0 } as ProductState
  );
}

export const reducers = {
  reduceProduct: createReducer(reduceProductState),
};
