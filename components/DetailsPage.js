export default class DetailsPage extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const template = document.getElementById("details-page-template");
    const content = template.content.cloneNode(true);
    this.append(content);
  }
}

customElements.define("details-page", DetailsPage);
