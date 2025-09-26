
export type Product = { id: number; name: string; unit_price: number };

export type OrderLineInput = { product_id: number; quantity: number };

export type CreateOrderPayload = {
  visit_date: string;
  vat: number;
  order_lines: OrderLineInput[];
};

export interface IOrder {
  id: number;
  status: "pending" | "confirmed" | "canceled" | "refund";
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