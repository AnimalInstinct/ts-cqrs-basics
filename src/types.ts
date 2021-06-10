// State
export type ProductState = {
  id: string;
  name: string;
  price: number;
  version: number;
};

export type ProductCommand = CreateProduct | ChangeProductPrice;

// Commands
type CreateProduct = {
  id: string;
  type: "CreateProduct";
  name: string;
  price: number;
};

type ChangeProductPrice = {
  id: string;
  type: "ChangeProductPrice";
  price: number;
};

// Events
export type ProductEvent = ProductCreated | ProductPriceChanged;

type ProductCreated = {
  id: string;
  type: "ProductCreated";
  name: string;
  price: number;
};

type ProductPriceChanged = {
  id: string;
  type: "ProductPriceChanged";
  price: number;
};

// ReadModel
export type ProductModel = {
  id: string;
  name: string;
  currentPrice: number;
  priceHistory: number[];
};

//////////////////////////////////////////////////////////////

type OrderState = {
  id: string;
  product: "";
  version: number;
};

// commands

type CreateOrder = {
  id: string;
  type: "CreateOrder";
  product: "";
};
