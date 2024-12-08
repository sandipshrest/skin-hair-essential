export const getOrderStatusColor = (orderStatus) => {
  switch (orderStatus.toLowerCase()) {
    case "hold":
      return "bg-yellow-300";
    case "processing":
      return "bg-blue-300";
    case "completed":
      return "bg-green-300";
    case "cancelled":
      return "bg-red-300";
    default:
      return "";
  }
};
