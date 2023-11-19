import API from "./api.js";

export async function loadData() {
  const menuData = await API.fetchMenu();
  coffee_app.store.menu = menuData;
}

export async function getProductById(category_name, productId) {
  if (coffee_app.store.menu === null) {
    await loadData();
  }

  const category = coffee_app.store.menu.find(
    (category) => category.name === category_name
  );

  if (!category) return null;

  const product = category.products.find((product) => product.id === productId);

  if (!product) return null;

  return product;
}
