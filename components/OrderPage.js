import API from "../services/api.js";

export default class OrderPage extends HTMLElement {
  #order = {
    name: "",
    phone: "",
    email: "",
  };

  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    const style = document.createElement("style");
    API.fetchCSS("OrderPage").then((styles) => {
      style.textContent = styles;
    });

    const section = document.createElement("section");

    this.shadowRoot.append(style, section);
  }

  connectedCallback() {
    window.addEventListener("cartchange", () => {
      this.render();
    });
    this.render();
  }

  render() {
    const section = this.shadowRoot.querySelector("section");
    const cart = coffee_app.store.cart;

    if (cart.length === 0) {
      section.innerHTML = '<p class="empty">You cart is empty!</p>';
    } else {
      section.innerHTML = `
        <h2>Your Order</h2>
        <ul></ul>
      `;

      const template = document.getElementById("order-form-template");
      const content = template.content.cloneNode(true);
      section.append(content);

      const form = section.querySelector("form");

      this.setFormBindings(form);

      form.addEventListener("submit", (event) => {
        event.preventDefault();
        alert(`${this.#order.name}, your order was placed successfully!`);
        this.#order.name = "";
        this.#order.phone = "";
        this.#order.email = "";
      });

      const cartList = section.querySelector("ul");
      cart.forEach((cartItem) => {
        const cartListItem = document.createElement("cart-item");
        cartListItem.dataset.item = JSON.stringify(cartItem);
        cartList.append(cartListItem);
      });

      const totalPrice = cart.reduce(
        (acc, { quantity, price }) => acc + price * quantity,
        0
      );
      const totalPriceElement = document.createElement("li");
      totalPriceElement.innerHTML = `
        <p class='total'>Total</p>
        <p class='price-total'>$${totalPrice.toFixed(2)}</p>
      `;
      cartList.append(totalPriceElement);
    }
  }

  setFormBindings(form) {
    this.#order = new Proxy(this.#order, {
      set(target, property, value) {
        target[property] = value;
        form.elements[property].value = value;
        return true;
      },
    });

    Array.from(form.elements).forEach((element) => {
      element.addEventListener("change", (event) => {
        this.#order[event.target.name] = event.target.value;
      });
    });
  }
}
