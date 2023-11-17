export default class MenuPage extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: "open" });

    const template = document.getElementById("menu-page-template");
    const content = template.content.cloneNode(true);

    this.root.append(content);
  }
}

customElements.define("menu-page", MenuPage);
