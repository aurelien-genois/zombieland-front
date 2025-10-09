// ──────────────────────────────────────────────────────────────────────────────
// Statuts
// ──────────────────────────────────────────────────────────────────────────────
export type OrderStatus = "pending" | "confirmed" | "canceled" | "refund";


// ──────────────────────────────────────────────────────────────────────────────
/** Produits (back-office / BDD) */
// ──────────────────────────────────────────────────────────────────────────────
export type Product = {
  id: number;
  name: string;
  unit_price: number;
  price: number;
  status?: "draft" | "published";
};


export type CatalogProduct = {
  id: number;
  name: string;
  unit_price: number;
};

// ──────────────────────────────────────────────────────────────────────────────
/** Lignes de commande */
// ──────────────────────────────────────────────────────────────────────────────
export type OrderLineInput = { product_id: number; quantity: number; };

export interface IOrderLine {
  id: number;
  unit_price: number;
  quantity: number;
  product_id: number;
  order_id?: number;

  // côté back on inclut souvent le produit
  product?: {
    id: number;
    name: string;
    price: number;
  };
}

// ──────────────────────────────────────────────────────────────────────────────
/** Commande */
// ──────────────────────────────────────────────────────────────────────────────
export type OrdersSort =
  | "order_date:asc"
  | "order_date:desc"
  | "visit_date:asc"
  | "visit_date:desc"
  | "status:asc"
  | "status:desc";

// back renvoie des montants calculés (subtotal, vat_amount, total)
export interface IOrder {
  id: number;
  status: OrderStatus;

  order_date: string; 
  visit_date: string; 

  vat: number; 
  payment_method?: string | null;

  ticket_code: string;
  qr_code: string;

  user_id: number;
  user: IUser;       

  order_lines: IOrderLine[];

 
  subtotal: number;
  vat_amount: number;
  total: number;


  created_at?: string;
  updated_at?: string;


  computed_order_total_price?: number;
}

// Payload création côté front (checkout) et côté back-office (admin)
export type CreateOrderPayload = {
  visit_date: string;           
  vat: number;             
  order_lines: OrderLineInput[];
  payment_method?: string;
  user_id?: number;           
};

// ──────────────────────────────────────────────────────────────────────────────
/** Pagination (aligne avec le back: page, limit, totalCount, totalPages, etc.) */
// ──────────────────────────────────────────────────────────────────────────────
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

// Réponse paginée standard (alignée avec ton controller: { data, meta })
export interface IPaginatedOrders {
  data: IOrder[];
  meta: IMeta;
}

// ──────────────────────────────────────────────────────────────────────────────
// Types utilitaires (si tu en as encore besoin dans certains écrans)
// ──────────────────────────────────────────────────────────────────────────────
export type NumLike = number | `${number}`;
export type OrderLineLike = {
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