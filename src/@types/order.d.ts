export enum IStatus {
  Pending,
  Confirmed,
  Canceled,
  Refund
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
  status: string;
  ticket_code: string;
  updated_at: string;
  user: User;
  user_id: number;
  vat: string;
  visit_date: string;
}


export interface IPaginatedOrders {
  ordersWithTotal: IOrders[];
  TotalOrders: string;
}
