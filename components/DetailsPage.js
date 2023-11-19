import API from "../services/api.js";
import { getProductById } from "../services/menu.js";
import { addToCart } from "../services/order.js";

export default class DetailsPage extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: "open" });

    const style = document.createElement("style");
    API.fetchCSS("DetailsPage").then((styles) => {
      style.textContent = styles;
    });

    const template = document.getElementById("details-page-template");
    const content = template.content.cloneNode(true);

    this.root.append(style, content);
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

      this.root.querySelector("h2").textContent = product.name;
      this.root.querySelector("p.description").textContent =
        product.description;
      this.root.querySelector(
        "p.price"
      ).textContent = `$${product.price.toFixed(2)}`;

      this.root.querySelector("img").src = `/data/images/${product.image}`;

      this.root.querySelector("button").addEventListener("click", () => {
        addToCart(product);
        coffee_app.router.go("/order");
      });
    } else {
      alert("Product ID or category id missing");
    }
  }
}

customElements.define("details-page", DetailsPage);
