import store from "./services/store";

window.coffee_app = {};
coffee_app.store = store;

window.addEventListener("DOMContentLoaded", () => {
  console.log("dom is ready");
});
