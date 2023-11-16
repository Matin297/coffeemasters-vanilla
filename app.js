import store from "./services/store.js";
import { loadData } from "./services/menu.js";

window.coffee_app = {};
coffee_app.store = store;

window.addEventListener("DOMContentLoaded", () => {
  console.log("dom is ready");
  loadData();
});
