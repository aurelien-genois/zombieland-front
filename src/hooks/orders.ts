import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./redux";
import {
  fetchProducts,
  createOrder,
  fetchOneOrder,
  fetchAllOrders,
  fetchUserOrders,
  updateOrderStatus,
} from "@/store/reducers/ordersReducer";

import type { CreateOrderPayload, OrderStatus, OrdersSort } from "@/@types";

/** ============================================================================
 * PRODUITS
 * ========================================================================== */
export function useOrderProducts() {
  const dispatch = useAppDispatch();
  const { products, loadingProducts, productsError } = useAppSelector(
    (state) => state.ordersStore
  );

  useEffect(() => {
    if (!products || products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products]);

  return { products, loadingProducts, productsError };
}

/** ============================================================================
 * CRÉATION DE COMMANDE
 * ========================================================================== */
export function useCreateOrder() {
  const dispatch = useAppDispatch();
  const { creating, createError, lastOrder } = useAppSelector(
    (state) => state.ordersStore
  );

  const submitOrder = useCallback(
    (payload: CreateOrderPayload) => dispatch(createOrder(payload)),
    [dispatch]
  );

  return { creating, createError, lastOrder, submitOrder };
}

/** ============================================================================
 * DÉTAIL
 * ========================================================================== */
export function useOrderDetail(orderId?: number) {
  const dispatch = useAppDispatch();
  const { order, loadingOrder, orderError } = useAppSelector(
    (state) => state.ordersStore
  );

  useEffect(() => {
    if (orderId != null) {
      dispatch(fetchOneOrder(orderId));
    }
  }, [dispatch, orderId]);

  return { order, loadingOrder, orderError };
}

/** ============================================================================
 * LISTE ADMIN (paginée + filtre + tri)
 * auto = true => fetch automatique
 * ========================================================================== */
type UseAdminOrdersArgs = {
  page?: number;
  perPage?: number;              // ✅ remplace limit
  search?: string;
  status?: OrderStatus | "all";
  order?: OrdersSort;
  auto?: boolean; // default true
};

export function useAdminOrdersList({
  page,
  perPage,
  search,
  status,
  order,
  auto = true,
}: UseAdminOrdersArgs = {}) {
  const dispatch = useAppDispatch();
  const {
    orders,
    loadingOrders,
    ordersError,
    page: curPage,
    perPage: curPerPage,         // ✅ lit perPage du store
    search: curSearch,
    status: curStatus,
    orderSort: curOrder,
    meta,
    total,
  } = useAppSelector((state) => state.ordersStore);

  useEffect(() => {
    if (!auto) return;
    dispatch(
      fetchAllOrders({
          page: page ?? curPage,
          perPage: perPage ?? curPerPage, // ✅
          search: search ?? curSearch,
          status: (status ?? curStatus) === "all" ? undefined : (status as OrderStatus),
          order: order ?? curOrder,
          total: 0,
          totalCount: 0,
          totalPages: 0,
          hasPrev: false,
          hasNext: false
      })
    );
   
  }, [dispatch, auto, page, perPage, search, status, order, curPage, curPerPage, curSearch, curStatus, curOrder]);

  // (re)fetcher avec overrides
  const refetch = useCallback(
    (params?: Partial<UseAdminOrdersArgs>) => {
      dispatch(
        fetchAllOrders({
            page: params?.page ?? curPage,
            perPage: params?.perPage ?? curPerPage,
            search: params?.search ?? curSearch,
            status: (params?.status ?? curStatus) === "all"
                ? undefined
                : ((params?.status ?? curStatus) as OrderStatus),
            order: params?.order ?? curOrder,
            total: 0,
            totalCount: 0,
            totalPages: 0,
            hasPrev: false,
            hasNext: false
        })
      );
    },
    [dispatch, curPage, curPerPage, curSearch, curStatus, curOrder]
  );

  return {
    orders,
    loadingOrders,
    ordersError,
    page: curPage,
    perPage: curPerPage,          
    search: curSearch,
    status: curStatus,
    orderSort: curOrder,
    meta,
    total,
    refetch,
  };
}

/** ============================================================================
 * LISTE DES COMMANDES D’UN UTILISATEUR
 * ========================================================================== */
export function useUserOrders(userId?: number) {
  const dispatch = useAppDispatch();
  const { userOrdersList, loadingUserOrders, userOrdersError } = useAppSelector(
    (state) => state.ordersStore
  );

  useEffect(() => {
    if (userId != null) {
      dispatch(fetchUserOrders(userId));
    }
  }, [dispatch, userId]);

  return { userOrdersList, loadingUserOrders, userOrdersError };
}

/** ============================================================================
 * ACTIONS ADMIN
 * ========================================================================== */
export function useOrderAdminActions() {
  const dispatch = useAppDispatch();
  const changeStatus = useCallback(
    (id: number, status: OrderStatus) => dispatch(updateOrderStatus({ id, status })),
    [dispatch]
  );
  return { changeStatus };
}
