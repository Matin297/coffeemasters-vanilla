import API from "../services/api.js";

export default class OrderPage extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: "open" });

    const style = document.createElement("style");
    API.fetchCSS("OrderPage").then((styles) => {
      style.textContent = styles;
    });

    const template = document.getElementById("order-form-template");
    const content = template.content.cloneNode(true);

    this.root.append(style, content);
  }
}
