import OrderList from "../../components/admin/OrderList"

const OrdersPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Orders Management</h1>
      <OrderList />
    </div>
  )
}

export default OrdersPage

