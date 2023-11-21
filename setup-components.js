import DetailsPage from "./components/DetailsPage.js";
import MenuPage from "./components/MenuPage.js";
import OrderPage from "./components/OrderPage.js";
import ProductItem from "./components/ProductItem.js";
import CartItem from "./components/CartItem.js";

export default function setup() {
  customElements.define("details-page", DetailsPage);
  customElements.define("menu-page", MenuPage);
  customElements.define("order-page", OrderPage);
  customElements.define("product-item", ProductItem);
  customElements.define("cart-item", CartItem);
}
