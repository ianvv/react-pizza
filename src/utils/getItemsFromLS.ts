export const getItemsFromLS = () => {
  const data = localStorage.getItem("cart");
  return data ? JSON.parse(data) : [];
};

export const getTotalPrice = () => {
  const totalPrice = localStorage.getItem("totalPrice");
  return totalPrice ? JSON.parse(totalPrice) : 0;
};

export const getTotalCount = () => {
  const totalCount = localStorage.getItem("totalCount");
  return totalCount ? JSON.parse(totalCount) : 0;
};