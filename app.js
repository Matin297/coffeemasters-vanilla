import router from "./services/router.js";
import store from "./services/store.js";
import { loadData } from "./services/menu.js";
import setupComponents from "./setup-components.js";

setupComponents();

window.coffee_app = {};
coffee_app.store = store;
coffee_app.router = router;

window.addEventListener("DOMContentLoaded", () => {
  console.log("dom is ready");

  coffee_app.router.init();
  loadData();
});

window.addEventListener("cartchange", () => {
  const badge = document.getElementById("badge");
  const cartLength = coffee_app.store.cart.reduce(
    (acc, { quantity }) => acc + quantity,
    0
  );
  badge.textContent = cartLength;
  badge.hidden = cartLength === 0;
});
