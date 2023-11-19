export function addToCart(product) {
  const cart = [...coffee_app.store.cart];
  const productIndex = cart.findIndex((cartItem) => cartItem.id === product.id);

  if (productIndex > -1) {
    const cartProduct = cart[productIndex];
    cart.splice(productIndex, 1, {
      ...cartProduct,
      quantity: cartProduct.quantity + 1,
    });
    coffee_app.store.cart = cart;
  } else {
    coffee_app.store.cart = cart.concat({ ...product, quantity: 1 });
  }
}

export function removeFromCart(productId) {
  coffee_app.store.cart = coffee_app.store.cart.filter(
    (cartItem) => cartItem.id !== productId
  );
}
