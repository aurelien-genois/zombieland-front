
export type Product = { id: number; name: string; unit_price: number };
export type OrderStatus = "pending" | "confirmed" | "canceled" | "refund";
export type OrderLineInput = { product_id: number; quantity: number };
export type CreateOrderPayload = {
  visit_date: string;
  vat: number;
  order_lines: OrderLineInput[];
};
export type OrdersSort =
  | "order_date:asc"
  | "order_date:desc"
  | "visit_date:asc"
  | "visit_date:desc"
  | "status:asc"
  | "status:desc";

export interface IOrder {
  id: number;
  status: OrderStatus;
  visit_date: string;
  vat: number;
  ticket_code: string;
  order_lines: OrderLine[];
  user: { id: number; firstname: string; lastname: string; email: string };
  subtotal: number;
  vat_amount: number;
  total: number;
};

export interface IOrderLine {
  id: number;
  unit_price: number;
  quantity: number;
  product: { id: number; name: string };
};



export interface IMeta {
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
  hasPrev: boolean;
  hasNext: boolean;
}