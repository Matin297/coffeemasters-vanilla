import API from "../services/api.js";

export default class MenuPage extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: "open" });

    const style = document.createElement("style");
    API.fetchCSS("MenuPage").then((styles) => {
      style.textContent = styles;
    });

    const template = document.getElementById("menu-page-template");
    const content = template.content.cloneNode(true);

    this.root.append(style, content);
  }
}

customElements.define("menu-page", MenuPage);
