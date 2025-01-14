import { addToCart } from "../services/order.js";

export default class ProductItem extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const template = document.getElementById("product-item-template");
    const content = template.content.cloneNode(true);
    this.append(content);

    const product = JSON.parse(this.dataset.product);
    const category = this.dataset.category;

    this.querySelector("h4").textContent = product.name;
    this.querySelector("p.price").textContent = `$${product.price.toFixed(2)}`;
    this.querySelector("img").src = `data/images/${product.image}`;
    this.querySelector("a").addEventListener("click", (event) => {
      if (event.target.tagName.toLowerCase() === "button") {
        addToCart(product);
      } else {
        coffee_app.router.go(`/product-${product.id}/${category}`);
      }
    });
  }
}
