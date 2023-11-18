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

  connectedCallback() {
    window.addEventListener("menuchange", () => this.render());
  }

  render() {
    const menu = coffee_app.store.menu;

    const menuListElement = this.root.getElementById("menu");
    menuListElement.innerHTML = "";

    if (menu) {
      menu.forEach((category) => {
        const categoryElement = document.createElement("li");
        categoryElement.innerHTML = `
          <h3>${category.name}</h3>
          <ul class='category'></ul>
        `;
        menuListElement.append(categoryElement);
      });
    } else {
      menuListElement.innerHTML = "Loading...";
    }
  }
}

customElements.define("menu-page", MenuPage);
