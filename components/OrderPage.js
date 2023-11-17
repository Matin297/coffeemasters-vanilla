export default class OrderPage extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const template = document.getElementById("order-form-template");
    const content = template.content.cloneNode(true);
    this.append(content);
  }
}

customElements.define("order-page", OrderPage);
