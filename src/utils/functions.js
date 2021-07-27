export const getCartAmount = (cart = []) => {
  if (cart && cart.length > 0) {
    return cart.reduce((acc, amt) => {
      if (!amt.weight) {
        return acc + amt.price;
      } else {
        return acc + amt.price * (amt.weight / 1000);
      }
    }, 0);
  } else {
    return 0;
  }
};

export const addToCart = (setCart, CurrentCart = [], currentProduct = {}) => {
  const { image, ...newCurrentProduct } = currentProduct;
  setCart([...CurrentCart, newCurrentProduct]);
};

export const removeFromCart = (setCart, CurrentCart = [], productId = "") => {
  let index = CurrentCart.findIndex((p) => p._id === productId);
  let newCart = [...CurrentCart];
  newCart.splice(index, 1);
  setCart([...newCart]);
};

export const findProductWithId = (search, id) => {
  let foundProduct = search.find((p) => p._id === id);
  return foundProduct;
};

export const calculateDate = () => {
  const date = new Date();
  return date.toLocaleString("fr-FR", { weekday: "long" }) !== "samedi"
    ? new Date(date.setDate(date.getDate() + 1)).toISOString().split("T")[0]
    : new Date(date.setDate(date.getDate() + 2)).toISOString().split("T")[0];
};
