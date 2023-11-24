import API from "../services/api.js";
import { getProductById } from "../services/menu.js";
import { addToCart } from "../services/order.js";

export default class DetailsPage extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    const style = document.createElement("style");
    API.fetchCSS("DetailsPage").then((styles) => {
      style.textContent = styles;
    });

    const template = document.getElementById("details-page-template");
    const content = template.content.cloneNode(true);

    this.shadowRoot.append(style, content);
  }

  connectedCallback() {
    this.render();
  }

  async render() {
    const category = this.dataset.category;
    const productId = this.dataset.productId;

    if (category && productId) {
      const product = await getProductById(category, Number(productId));

      if (!product) {
        return alert("No such product found!");
      }

      this.shadowRoot.querySelector("h2").textContent = product.name;
      this.shadowRoot.querySelector("p.description").textContent =
        product.description;
      this.shadowRoot.querySelector(
        "p.price"
      ).textContent = `$${product.price.toFixed(2)}`;

      this.shadowRoot.querySelector(
        "img"
      ).src = `/data/images/${product.image}`;

      this.shadowRoot.querySelector("button").addEventListener("click", () => {
        addToCart(product);
        coffee_app.router.go("/order");
      });
    } else {
      alert("Product ID or category id missing");
    }
  }
}
