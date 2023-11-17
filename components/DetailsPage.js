export default class DetailsPage extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: "open" });

    const template = document.getElementById("details-page-template");
    const content = template.content.cloneNode(true);

    this.root.append(content);
  }
}

customElements.define("details-page", DetailsPage);
