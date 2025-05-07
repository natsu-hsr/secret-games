export type TOrderStatus = 'Новый' | 'Доставляется' | 'Завершен';

export type TOrder = {
  orderId: string;
  status: TOrderStatus;
  createdDate: string;
  shippingAddress: string;
  deliveryAddress: string;
};

export type TOrders = TOrder[];

export type TOrderFilter = {
  key: keyof TOrder;
  value: string;
}

export type TOrderFilters = TOrderFilter[];

export type TOrdersSliceState = {
  appliedFilters: TOrderFilters | undefined;
  data: TOrders | undefined; // тут хранятся только отображаемые данные (отфильтрованные)
  allData: TOrders | undefined; // все данные, за неимением бэка, храним тут
}

type TOrderCost = {
  value: number;
  vat_sum: number;
}

export type TOrderSender = {
  company: string;
  name: string;
  passportRequirementsSatisfied: boolean;
}

type TClientPhone = {
  number: string;
}

type TClientPhones = TClientPhone[];

export type TOrderRecipient = TOrderSender & {
  phones: TClientPhones;
}

type TOrderSeller = {
  name: string;
}

export type TOrderLocation = {
  code: string;
  city: string;
  country: string;
  region: string;
  address: string;
  postalCode: string;
}

export type TOrderItem = {
  name: string;
  amount: number;
  cost: number;
}

export type TOrderItems = TOrderItem[];

export type TOrderPackage = {
  barcode: string;
  weight: number;
  length: number;
  width: number;
  height: number;
  items: TOrderItems
};

export type TOrderPackages = TOrderPackage[];

export type TOrderDetails = {
  orderId: string;
  isReturn: boolean;
  cdekNumber: string;
  comment: string;
  shipmentPoint: string;
  deliveryPoint: string;
  itemsCostCurrency: string;
  deliveryRecipientCost: TOrderCost;
  sender: TOrderSender;
  seller: TOrderSeller;
  recipient: TOrderRecipient;
  fromLocation: TOrderLocation;
  toLocation: TOrderLocation;
  packages: TOrderPackages;
}

export type TOrdersDetails = TOrderDetails[];