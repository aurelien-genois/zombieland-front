export enum IStatus {
  Pending,
  Confirmed,
  Canceled,
  Refund
}
export type OrderStatus = "pending" | "confirmed" | "canceled" | "refund";
export type Product = {
  price: number; id: number; name: string; unit_price: number 
};
export type OrderLineInput = { product_id: number; quantity: number };
export type OrdersSort =
  | "order_date:asc"
  | "order_date:desc"
  | "visit_date:asc"
  | "visit_date:desc"
  | "status:asc"
  | "status:desc";

export type CreateOrderPayload = {
  visit_date: string;
  vat: number;
  order_lines: OrderLineInput[];
};

export interface IMeta {
  page: number;
  perPage: number;
  total: number;
  totalCount: number;
  totalPages: number;
  hasPrev: boolean;
  hasNext: boolean;
  search?: string; 
  status?: OrderStatus; 
  order?: OrdersSort
}
export interface IOrderLine {
  id: number;
  unit_price: number;
  quantity: number;
  product_id: number;
  order_id: number;
}

interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
}

export interface IOrder {
  computed_order_total_price: number;
  created_at: string;
  id: number;
  order_date: string;
  order_lines: OrderLine[];
  payment_method: string;
  status: OrderStatus;
  ticket_code: string;
  updated_at: string;
  user: User;
  user_id: number;
  vat: string;
  visit_date: string;
  total: number;
}


export interface IPaginatedOrders {
  ordersWithTotal: IOrders[];
  TotalOrders: string;
}

type NumLike = number | `${number}`;
type OrderLineLike = {
  id?: number;
  quantity?: number;
  unit_price?: NumLike;
  name?: string;
  product_name?: string;
  product_id?: number;
  product?: {
    id?: number;
    name?: string;
    price?: NumLike;
  };
};
