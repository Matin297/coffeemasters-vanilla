import API from "../services/api.js";

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
}

customElements.define("details-page", DetailsPage);
