export const getOrderStatusColor = (orderStatus) => {
  switch (orderStatus.toLowerCase()) {
    case "hold":
      return "bg-yellow-100 text-yellow-700";
    case "processing":
      return "bg-blue-100 text-blue-700";
    case "completed":
      return "bg-green-100 text-green-700";
    case "cancelled":
      return "bg-red-100 text-red-700";
    default:
      return "";
  }
};
