import { models } from "./store";
import { ProductEvent } from "./types";

export function updateProductModel(event: ProductEvent) {
  switch (event.type) {
    case "ProductCreated":
      models.product.write({
        id: event.id,
        name: event.name,
        currentPrice: event.price,
        priceHistory: [],
      });
      break;

    case "ProductPriceChanged":
      const model = models.product.read(event.id)!;
      model.currentPrice = event.price;
      model.priceHistory = [...model.priceHistory, event.price];
      break;
  }
}
