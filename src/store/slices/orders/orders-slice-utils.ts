import {ordersDetailsMocks} from "../../../mocks/orders/orders-details";
import {TOrderDetails} from "./orders-slice-types"

type FindOrderDetailsByIdArgs = Pick<TOrderDetails, 'orderId'>
export const findOrderDetailsById = ({orderId}: FindOrderDetailsByIdArgs): TOrderDetails | undefined => (
  ordersDetailsMocks?.find(od => od.orderId === orderId)
);
