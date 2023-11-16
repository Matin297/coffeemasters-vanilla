import router from "./services/router.js";
import store from "./services/store.js";
import { loadData } from "./services/menu.js";

window.coffee_app = {};
coffee_app.store = store;
coffee_app.router = router;

window.addEventListener("DOMContentLoaded", () => {
  console.log("dom is ready");

  coffee_app.router.init();
  loadData();
});
