import { useState } from "react";
import OrderTemplate from "./OrderTemplate";
import OrderTemplatePast from "./OrderTemplatePast";

export default function OrdersHistory() {
  const [orderState, setOrderState] = useState("active")
  return(
    <>
      <div className="flex flex-col justify-center md:max-w-200 sm:max-w-150 mx-auto">
        <h2 className="flex justify-center text-center font-bold text-3xl sm:text-xl mb-3">Mes commandes à venir</h2>
        <OrderTemplate />
        <h2 className="flex justify-center text-center font-bold text-3xl sm:text-xl mb-3">Mes commandes passées</h2>
        <OrderTemplatePast />
        <OrderTemplatePast /> 
        <OrderTemplatePast />         
      </div>
    </>
  )
}