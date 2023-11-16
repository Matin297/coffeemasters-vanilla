import API from "./api.js";

export async function loadData() {
  const menuData = await API.fetchMenu();
  coffee_app.store.menu = menuData;
}
